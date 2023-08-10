import time
from datetime import datetime, timezone
from bs4 import BeautifulSoup
from .models import  db, Todo, todo_schema, todos_schema
from flask import request  # jsonify() not necessary -> dict is automatically JSONified
from . import app

# TODO: REMOVE RETURN STATEMENTS AND TIME METHOD, addd status codes


from flask import json
from werkzeug.exceptions import HTTPException

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



@app.route('/time')
def get_time():
    sec_since_epoch = time.time()
    curr = time.ctime(sec_since_epoch)
    return {'time' : curr}

# def prettifyError(err):
#     soup = BeautifulSoup(err, 'html.parser')

#     err_p = soup.find('p')
#     err_title = soup.find('title') #st code
#     err_h1 = soup.find('h1')

#     err_status_code = 500 # default
#     if err_title:
#         try:
#             err_staus_code = int(err_title.get_text[0:3])
#             print("err_staus_code", err_staus_code)
#         except:
#             pass

#     err_message = err_p.get_text() if err_p else "Some error"
#     err_name = err_h1.get_text() if err_h1 else "Server Error message"

#     return {
#         'status': err_status_code,
#         'name': err_name,
#         'message' : err_message
# }


@app.route('/get-all')
def get_all_todos():
    ''' returns list of todos dict'''
    try:
        out = Todo.query.all()
        result = todos_schema.dump(out)
        return result
    except Exception as e:
        return {e}


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
        return {'error': f'Failed to delete todo: {e}' }, 500


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
