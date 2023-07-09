import os
import sys 
current_dir = os.path.abspath(os.path.dirname(__file__))
lib_dir = os.path.join(current_dir, "lib")
sys.path.append(lib_dir)
from flask import Flask, request, jsonify
from auth.auth_user import auth_user_by_token
from conn import get_conn_by_data_warehouse
from functools import wraps
from common.print_message import print_warning
from common.catch_exceptions import catch_exceptions
app = Flask(__name__)

def auth_user(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        data = request.get_json()
        if 'uid' in data and 'token' in data and auth_user_by_token(data['uid'], data['token']):
            return func(*args, **kwargs)
        else:
            return jsonify({'err': 'Authentication failed'})
    wrapper.endpoint = func.__name__
    return wrapper

@app.route('/api/list_tables', methods=['POST'])
@catch_exceptions
@auth_user
def list_tables():
    data = request.get_json()
    conn_result = get_conn_by_data_warehouse(data)
    if 'conn' in conn_result and conn_result['conn']:
        conn = conn_result['conn']
        return {'result': conn.list_tables({})}
    else:
        return {'err': conn_result['err'] if 'err' in conn_result else 'unknow error'}

@app.route('/api/is_connectable', methods=['POST'])
@catch_exceptions
@auth_user
def is_connectable():
    data = request.get_json()
    conn_result = get_conn_by_data_warehouse(data)
    if 'conn' in conn_result and conn_result['conn']:
        conn = conn_result['conn']
        return {'result': conn.is_connectable()}
    else:
        return {'err': conn_result['err'] if 'err' in conn_result else 'unknow error'}

@app.route('/api/validate_sql', methods=['POST'])
@catch_exceptions
@auth_user
def validate_sql():
    data = request.get_json()
    if not 'sql' in data:
        return {'err': 'param sql is required'}
    sql = data['sql']
    conn_result = get_conn_by_data_warehouse(data)
    if 'conn' in conn_result and conn_result['conn']:
        conn = conn_result['conn']
        return {'result': conn.validate_sql(sql)}
    else:
        return {'err': conn_result['err'] if 'err' in conn_result else 'unknow error'}

def handler(environ, start_response):
    return app(environ, start_response)

def rsa_warning():
    rsa_warning_str = '注意!! 如果您在生产环境中部署此代码，请替换此项目中的公钥和私钥，同时更新web端项目中的公钥\n\n'
    rsa_warning_str += 'Note!! If you deploy this code in the production environment,\n'
    rsa_warning_str += 'please replace the public and private keys in this project, \n'
    rsa_warning_str += 'and update the public key in the web project at the same time\n'
    print_warning(rsa_warning_str)

if __name__ == '__main__':
    rsa_warning()
    app.run(host="0.0.0.0", port=9001)