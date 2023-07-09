from conn.base import DataWarehouseConnector
from contextlib import contextmanager
from error import WarehouseConnectError
from sqlalchemy import create_engine, text
from sqlalchemy.engine.url import URL
from common.sql_split import split_sql


@contextmanager
def sqlalchemy_connection(**kwargs):
    try:
        db_url = URL.create("postgresql", **kwargs)
        engine = create_engine(db_url)
        conn = engine.connect()  
    except Exception as e:
        raise WarehouseConnectError(str(e))
    try:
        yield conn
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()


def get_table_columns_by_conn(conn, schema, table_name):
    sql = '''SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_schema = '{}'
      AND table_name = '{}'
      ORDER BY ordinal_position '''.format(schema, table_name)
    columns = conn.execute(text(sql)).fetchall()
    
    partitions = []
    result = []
    for column in columns:
        column_name = column[0]
        column_type = column[1]
        is_partition = False
        if column_name in partitions:
            is_partition = True
        result.append({'name': column_name, 'type': column_type, 'is_partition': is_partition})
    return result


class PostgreSQLConnector(DataWarehouseConnector):
    quote_str = '"'
    def __init__(self, host, user, password, database, port=5432):
        self.warehouse_config = {
            'host': host,
            'username': user,
            'password': password,
            'database': database,
            'port': port
        }

    def is_connectable(self):
        try:
            with sqlalchemy_connection(**self.warehouse_config) as conn:
                return 'success'
        except Exception as e:
            return 'fail'
    
    def validate_sql(self, sql):
        with sqlalchemy_connection(**self.warehouse_config) as conn:
            try:
                for item in split_sql(sql):
                    result_proxy = conn.execute(text(f'explain {item}'))
                    result_proxy.fetchone()
                return {'validate_result': 'success'}
            except Exception as e:
                message = str(e)
                return {
                    'validate_result': 'fail',
                    'message': message,
                }

    def list_tables(self, params):
        with sqlalchemy_connection(**self.warehouse_config) as conn:
            sql = """SELECT schema_name FROM information_schema.schemata 
                WHERE schema_name NOT LIKE 'pg_%' AND schema_name != 'information_schema'
            """
            ret = conn.execute(text(sql))
            schemas = [row[0] for row in ret]
            result = []
            # 遍历每个schema, 获取每个schema的tables 需要区分table和view
            for schema in schemas:
                result.append({
                        'name': schema,
                        'children': []
                })

                sql_t = """SELECT table_name, table_type FROM information_schema.tables
                    WHERE table_schema = '{}'   
                    AND table_type = 'BASE TABLE'   
                """.format(schema)
                ret_t = conn.execute(text(sql_t))
                tables = [row[0] for row in ret_t]

                sql_v = """SELECT table_name, table_type FROM information_schema.tables
                    WHERE table_schema = '{}'   
                    AND table_type = 'VIEW'   
                """.format(schema)
                ret_v = conn.execute(text(sql_v))
                views = [row[0] for row in ret_v]

                if tables:
                    for table in tables:
                        ref_name = PostgreSQLConnector.get_ref_table_identifier(schema, table)
                        columns = get_table_columns_by_conn(conn, schema, table)
                        result[-1]['children'].append({
                            'name': table, 
                            'is_view': False, 
                            'columns': columns,
                            'ref_name': ref_name
                        })
                if views:
                    for view in views:
                        ref_name = PostgreSQLConnector.get_ref_table_identifier(schema, view)
                        columns = get_table_columns_by_conn(conn, schema, table)
                        result[-1]['children'].append({
                            'name': table, 
                            'is_view': True, 
                            'columns': columns,
                            'ref_name': ref_name
                        })
            return result
                
