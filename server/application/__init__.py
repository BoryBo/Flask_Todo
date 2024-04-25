import os

from config import Config
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

db = SQLAlchemy()
ma = Marshmallow()

def create_app():
    # Initialize app
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # Initialize plugins (SQLAlchemy before Marshmallow)
    db.init_app(app)
    ma.init_app(app)

    migrate = Migrate(app, db)
    from application.models import Todo

    with app.app_context():
      db.create_all()

    return app

app=create_app()
from . import routes
