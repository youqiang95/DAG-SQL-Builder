from .mysql import MySQLConnector
from .maxcompute import MaxcomputeConnector
from .postgresql import PostgreSQLConnector
from encrypt.decrypt import decrypt

DATA_WAREHOUSE_CONN_CLASS = {
    'mysql': MySQLConnector,
    'maxcompute': MaxcomputeConnector,
    'postgresql': PostgreSQLConnector
}

def get_conn_by_data_warehouse(data):
    result = {'conn': None}
    if 'warehouse' not in data:
        result['err'] = 'param warehouse is required'
        return result
    warehouse = data['warehouse']
    if warehouse not in DATA_WAREHOUSE_CONN_CLASS:
        result['err'] = 'warehouse type not support: ' + warehouse
        return result
    if warehouse == 'mysql':
        if 'host' in data and 'user' in data and 'password' in data and 'database' in data:
            host = data['host']
            user = data['user']
            password = decrypt(data['password'])
            database = data['database']
            port = data['port'] if 'port' in data else None
            result['conn'] = MySQLConnector(host, user, password, database, port)
            return result
        else:
            result['err'] = 'mysql conn params error'
            return result
    elif warehouse == 'maxcompute':
        if 'access_id' in data and 'access_key' in data and 'project_name' in data and 'endpoint' in data:
            access_id = decrypt(data['access_id'])
            access_key = decrypt(data['access_key'])
            project_name = data['project_name']
            endpoint = data['endpoint']
            result['conn'] = MaxcomputeConnector(access_id, access_key, project_name, endpoint)
            return result
        else:
            result['err'] = 'maxcompute conn params error'
            return result
    elif warehouse == 'postgresql':
        if 'host' in data and 'user' in data and 'password' in data and 'database' in data:
            host = data['host']
            user = data['user']
            password = decrypt(data['password'])
            database = data['database']
            port = data['port'] if 'port' in data else None
            result['conn'] = PostgreSQLConnector(host, user, password, database, port)
            return result
        else:
            result['err'] = 'postgresql conn params error'
            return result
    else:
        result['err'] = 'warehouse error:' + warehouse
        return result