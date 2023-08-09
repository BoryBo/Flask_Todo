import { useEffect } from 'react';
import { getAllTodos } from '../util/apiService';
import Todo from './Todo';
import './todoList.css';
import sortArrByTimestamp from '../util/sortByTimestamp.mjs';

function TodosList ({ setTodos, todos }) {

  useEffect(() => {
    getAllTodos()
      .then((res) => {
        setTodos(sortArrByTimestamp(res) || res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setTodos]);


  return (
    <ul className='todo-list'>
      {todos.length > 0
        ?
        todos.map(todo =>
          <Todo
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ) : (
          <input
            readOnly='There are no todos! Yay!'
            className='no-todos-imp'>
          </input>
        )}
    </ul>
  );
}

export default TodosList;