from conn.base import DataWarehouseConnector
from contextlib import contextmanager
from error import WarehouseConnectError
from common.sql_split import split_sql
from odps import ODPS
from odps import options
options.sql.settings = {'odps.sql.submit.mode': 'script'}


@contextmanager
def maxcompute_connection(**kwargs):
    try:
        conn = ODPS(**kwargs)
    except Exception as e:
        raise WarehouseConnectError(str(e))
    try:
        yield conn
    except Exception as e:
        raise e
    finally:
        del conn 

class MaxcomputeConnector(DataWarehouseConnector):
    quote_str = '`'
    def __init__(self, access_id, access_key, project_name, endpoint):
        self.warehouse_config = {
            'access_id': access_id,
            'secret_access_key': access_key,
            'project': project_name,
            'endpoint': endpoint   
        }

    def is_connectable(self):
        try:
            with maxcompute_connection(**self.warehouse_config) as conn:
                with conn.execute_sql(f'select 1 as a').open_reader() as reader:
                    pass
                return 'success'
        except Exception as e:
            return 'fail'

    def validate_sql(self, sql):
        with maxcompute_connection(**self.warehouse_config) as conn:
            try:
                for item in split_sql(sql):
                    with conn.execute_sql(f'explain {item}').open_reader() as reader:
                        pass 
                return {'validate_result': 'success'}
            except Exception as e:
                return {
                    'validate_result': 'fail',
                    'message': str(e),
                }
    
    def list_tables(self, params):
        with maxcompute_connection(**self.warehouse_config) as conn:
            tables = conn.list_tables()
            result = []
            for table in tables:
                partition_columns = list(map(lambda item: item.name, table.schema.partitions))
                columns = []
                for col in table.schema.columns:
                    columns.append({'name': col.name, 'type': str(col.type), 'is_partition': col.name in partition_columns})
                ref_name = MaxcomputeConnector.get_ref_table_identifier(self.warehouse_config['project'], table.name)
                result.append({'name': table.name, 'is_view': table.is_virtual_view, 'columns': columns, 'ref_name': ref_name})
            return result