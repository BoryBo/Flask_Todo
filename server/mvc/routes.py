import time
from datetime import datetime
from .models import  db, Todo, todo_schema, todos_schema
from flask import request, jsonify #jsonify() not necessary -> dict is automatically JSONified
from . import app


@app.route('/time')
def get_time():
    sec_since_epoch = time.time()
    curr = time.ctime(sec_since_epoch)
    return jsonify({'time' : curr})
    # return {'time' : curr}

@app.route('/get-all')
def get_all_todos():
    ''' returns list of todos dict'''
    try:
        out = Todo.query.all()
        result = todos_schema.dump(out)
        return jsonify(result)
        # return result
    except Exception as e:
        return jsonify({'error': f'Failed to add todo: {e}' }), 500

@app.route('/add', methods = ['POST'])
def add_todo():
    ''' adds a new todo'''
    content = request.json['content']
    if content is None:
        return jsonify({'error': 'Content field is missing in the request JSON'}), 400
    try:
        tt = Todo(content)
        db.session.add(tt)
        db.session.commit()
        result = todo_schema.dump(tt)
        return jsonify(result)
        #return result

    except Exception as e:
        db.session.rollback()  # avoids any partial updates
        return jsonify({'error': f'Failed to add todo: {e}' }), 500

@app.route('/update/<int:id>', methods = ['PUT'])
def edit_todo(id):
    ''' updates an existing todo'''
    t = db.get_or_404(Todo, id, description = f'Record with id: {id} does not exist.')
    try:
        data = request.json
        # print(data)

        if 'content' in data:
          t.content = data['content']
        if 'completed' in data:
            t.completed = bool(data['completed'])

        t.timestamp = datetime.utcnow()
        db.session.commit()
        result = todo_schema.dump(t)
        return result
        #return jsonify(result)
        #return jsonify({'message' :f'Todo with id: {id} was successfully updated.'})

    except Exception as e:
        return jsonify({'error': f'Failed to update todo: {e}' }), 500

@app.route('/delete/<int:id>', methods = ['DELETE'])
def delete_todo(id):
    ''' deletes todo form list'''
    t = db.get_or_404(Todo, id, description =  f'Todo with id: {id} does not exist.')
    try:
        db.session.delete(t)
        db.session.commit()
        return jsonify({'message': f'Todo with id: {id} was deleted successfully'})
    except Exception as e:
        return jsonify({'error': f'Failed to delete todo: {e}' }), 500
