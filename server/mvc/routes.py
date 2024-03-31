import time
from flask import json, request
from werkzeug.exceptions import HTTPException
from datetime import datetime, timezone
from .models import  db, Todo, todo_schema, todos_schema
from . import app


@app.errorhandler(HTTPException)
def handle_exception(e):
    '''Return JSON instead of HTML for HTTP errors.'''
    response = e.get_response()
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response


@app.route('/get-all')
def get_all_todos():
    ''' returns list of todos dict'''
    try:
        out = Todo.query.all()
        result = todos_schema.dump(out)
        return result
    except Exception as e:
        return e


@app.route('/add', methods = ['POST'])
def add_todo():
    ''' adds a new todo'''
    content = request.json['content']
    checked = request.json['checked']
    if content is None:
        return {
            "code": 400,
            "description": "'Content' field is missing.",
            "name": "Bad Request"
        }
    try:
        tt = Todo(content, checked)
        db.session.add(tt)
        db.session.commit()
        result = todo_schema.dump(tt)
        return result, 201
    except Exception as e:
        db.session.rollback()  # avoids any partial updates
        return e


@app.route('/delete/<int:id>', methods = ['DELETE'])
def delete_todo(id):
    ''' deletes todo form list'''
    try:
        try:
            t = db.get_or_404(Todo, id)  # , description = f'Record with id: {id} does not exist.')
        except Exception as e:
                return {
                    "code": 404,
                    "description": f"Record with id: {id} does not exist.",
                    "name": "Not Found"
                }
        db.session.delete(t)
        db.session.commit()
        return {'message': f'Todo with id: {id} was deleted successfully'}
    except Exception as e:
        return e


@app.route('/update/<int:id>', methods = ['PUT'])
def edit_todo(id):
    ''' updates an existing todo'''
    try:
        try:
            t = db.get_or_404(Todo, id)  # , description = f'Record with id: {id} does not exist.')
        except Exception as e:

                return {
                    "code": 404,
                    "description": f"Record with id: {id} does not exist.",
                    "name": "Not Found"
                    }
        data = request.json
        if 'content' in data:
            t.content = data['content']
        if 'checked' in data:
            if (data['checked']).lower() == 'true':
                t.checked = True
            else:
                t.checked = False
        try:
            t.timestamp = datetime.utcnow()
        except Exception as e:
            return {
                "description" : f"Failed to update timestamp: {e}",
                "code": 500,
                "name": "Not Found"
                }
        db.session.commit()
        result = todo_schema.dump(t)
        return (result)
    except Exception as e:
        return e
