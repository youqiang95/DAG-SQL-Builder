import sqlparse

def split_sql(raw):
    return sqlparse.split(raw)