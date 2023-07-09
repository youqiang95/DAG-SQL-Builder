from abc import ABC, abstractmethod


class DataWarehouseConnector(ABC):
    quote_str = ''
    
    @abstractmethod
    def validate_sql(self, sql):
        pass
    
    @abstractmethod
    def list_tables(self, params):
        pass
    
    @abstractmethod
    def is_connectable(self):
        pass

    @classmethod
    def get_ref_table_identifier(cls, schema_name, table_name):
        quote = cls.quote_str
        return "{}{}{}.{}{}{}".format(quote, schema_name, quote, quote, table_name, quote)