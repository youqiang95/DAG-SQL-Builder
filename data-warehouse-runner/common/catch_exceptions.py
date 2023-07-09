import traceback
from error import WarehouseConnectError
from functools import wraps


def catch_exceptions(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except WarehouseConnectError as e:
            print(traceback.format_exc())
            return {'err': 'warehouse_connect_error'}
        except Exception as e:
            print(traceback.format_exc())
            return {'err': 'server_error'}
    wrapper.endpoint = func.__name__
    return wrapper