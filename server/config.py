import os

with open(os.environ['POSTGRES_USER_FILE']) as f:
    db_user = f.read()

with open(os.environ['POSTGRES_PASSWORD_FILE']) as f:
    db_password = f.read()

class Config(object):
    DB_USER = db_user
    DB_PASS = db_password
    DB_PORT = os.environ['POSTGRES_PORT']
    DB_NAME = os.environ['POSTGRES_DB']
    DB_HOST = os.environ['POSTGRES_HOST']
    SQLALCHEMY_DATABASE_URI = f'postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
