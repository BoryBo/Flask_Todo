# import sys
# print("executing __init__")
# print(sys.version)

from config import Config
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from .models import Todo, db, ma

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

#initialising extensions after creating app
db.init_app(app)
ma.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
  db.create_all()

from . import routes  # workaround to circular imports
