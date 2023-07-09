from conn.base import DataWarehouseConnector
import pymysql
from contextlib import contextmanager
from error import WarehouseConnectError
from common.sql_split import split_sql

@contextmanager
def pymysql_connection(**kwargs):
    try:
        conn = pymysql.connect(**kwargs)
    except Exception as e:
        raise WarehouseConnectError(str(e))
    try:
        yield conn
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()
    

def get_table_columns_by_cursor(cursor, table_name):
    cursor.execute(f'DESC  {table_name}')
    columns = cursor.fetchall()
    partitions = []
    cursor.execute(f"SELECT PARTITION_NAME FROM INFORMATION_SCHEMA.PARTITIONS WHERE TABLE_NAME = '{table_name}'")
    rows = cursor.fetchall()
    if rows:
        partitions = [row['PARTITION_NAME'] for row in rows]
    result = []
    for column in columns:
        column_name = column['Field']
        column_type = column['Type']
        is_partition = False
        if column_name in partitions:
            is_partition = True
        result.append({'name': column_name, 'type': column_type, 'is_partition': is_partition})
    return result


class MySQLConnector(DataWarehouseConnector):
    quote_str = '`'
    skip_schemas = ['information_schema','mysql', 'performance_schema', 'sys', '__recycle_bin__']
    def __init__(self, host, user, password, database, port=3306):
        self.warehouse_config = {
            'host': host,
            'user': user,
            'password': password,
            'database': database,
            'port': port,
            'charset': 'utf8mb4',
            'cursorclass': pymysql.cursors.DictCursor,
            'connect_timeout': 5,
            'read_timeout': 5
        } 
    
    def is_connectable(self):
        try:
            with pymysql_connection(**self.warehouse_config) as conn:
                return 'success'
        except Exception as e:
            return 'fail'
    
    def validate_sql(self, sql):
        with pymysql_connection(**self.warehouse_config) as conn:
            try:
                with conn.cursor() as cursor:
                    for item in split_sql(sql):
                        cursor.execute(f'explain {item}')
                        cursor.fetchone()
                    return {'validate_result': 'success'}
            except Exception as e:
                message = str(e)
                return {
                    'validate_result': 'fail',
                    'message': message,
                }
    
    def list_tables(self, params):
        with pymysql_connection(**self.warehouse_config) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SHOW DATABASES")
                result = cursor.fetchall()
                schemas = [row['Database'] for row in result if row['Database'].lower() not in MySQLConnector.skip_schemas]
                result = []
                for schema in schemas:
                    result.append({
                        'name': schema,
                        'children': []
                    })
                    database = schema
                    cursor.execute("SHOW TABLES from {}".format(database))
                    tables = cursor.fetchall()
                    cursor.execute("SHOW FULL TABLES from {} WHERE Table_type = 'VIEW'".format(database))
                    views = cursor.fetchall()
                    if tables:
                        for table in tables:
                            key = f'Tables_in_{database}'
                            if(not key in table):
                                continue
                            table_name = table[key]
                            ref_name = MySQLConnector.get_ref_table_identifier(schema, table_name)
                            columns = get_table_columns_by_cursor(cursor, ref_name)
                            result[-1]['children'].append({
                                'name': table_name, 
                                'is_view': False, 
                                'columns': columns,
                                'ref_name': ref_name
                            })
                    if views:
                        for view in views:
                            key = f'Tables_in_{database}'
                            if(not key in view):
                                continue
                            view_name = view[key]
                            ref_name = MySQLConnector.get_ref_table_identifier(schema, view_name)
                            columns = get_table_columns_by_cursor(cursor, ref_name)
                            result[-1]['children'].append({
                                'name': view_name, 
                                'is_view': True, 
                                'columns': columns,
                                'ref_name': ref_name
                            })
                return result