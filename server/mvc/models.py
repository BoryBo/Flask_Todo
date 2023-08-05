from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()
# print(dir(db))

class Todo (db.Model):
    __tablename__ = 'Todos'

    id = db.Column(db.Integer, primary_key = True)
    completed = db.Column (db.Boolean(), default = False)
    content=db.Column(db.String(), nullable = False) #, unique = True
    timestamp = db.Column(db.DateTime, default = datetime.utcnow)

    def __init__(self, content ):
      self.content = content

    def __repr__(self):
       return f'Todo with ID :{self.id} => {self.content}'

    # def dict_format(self):
    #    return {
    #       "id": self.id,
    #       "content": self.content,
    #       "completed": self.completed,
    #       "timestamp": self.timestamp
    #       }


class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))


class TodoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Todo

    id = ma.auto_field()
    completed = ma.auto_field()
    content = ma.auto_field()
    timestamp = ma.DateTime()


todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)  # For serializing lists of Todo objects


# >>> pyton
# >>> from app_package import db, app
# >>> from app_package.models import Todo, ...
# >>> app.app_context().push()
# >>> db.create_all()

# t=Todo(completed=True, content="wash dishes")
# >>> db.session.add(t)
# >>> db.session.commit()