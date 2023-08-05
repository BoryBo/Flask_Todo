import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))
print(os.environ.get('SQLALCHEMY_DATABASE_URI'))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'some secret key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI') or "postgresql://<username>:<password>@<host>:<port>/<dbname>"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

print('OUT')