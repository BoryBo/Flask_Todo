import { useEffect } from 'react';
import * as apiService from '../apiService';
import Todo from './Todo';
import './todoList.css';

function TodosList ({ setTodos, todos }) {

  useEffect(() => {
    apiService.getAllTodos()
      .then((res) => {
        setTodos(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setTodos]);


  return (
    <ul className='todo-list'>
      {todos.map(t =>
        <Todo
          key={t.id}
          t={t}
        />

      )}

    </ul>
  );
}

export default TodosList;