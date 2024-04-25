from datetime import datetime

# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow
from . import db, ma

class Todo (db.Model):
    __tablename__ = 'Todos'

    id = db.Column(db.Integer, primary_key = True)
    checked = db.Column (db.Boolean()) #, default = False)
    content=db.Column(db.String(), nullable = False) #, unique = True
    timestamp = db.Column(db.DateTime, default = datetime.utcnow)

    def __init__(self, content, checked ):
      self.content = content
      self.checked = checked

    def __repr__(self):
       return f'Todo with ID :{self.id} => {self.content}'

    # def dict_format(self):
    #    return {
    #       "id": self.id,
    #       "content": self.content,
    #       "checked": self.checked,
    #       "timestamp": self.timestamp
    #       }

class TodoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Todo

    id = ma.auto_field()
    checked = ma.auto_field()
    content = ma.auto_field()
    timestamp = ma.DateTime()


todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)
