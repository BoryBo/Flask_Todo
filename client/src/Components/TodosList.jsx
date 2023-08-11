import Todo from './Todo';
import './todoList.css';

function TodosList ({ setTodos, todos, query, setErr, setLoading }) {

  return (
    <ul className='todo-list'>
      {todos.length > 0
        ?
        todos
          .filter(t => query !== '' ? t.content.toLowerCase().includes(query.toLowerCase()) : t)
          .map(todo =>
            <Todo
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              setErr={setErr}
            />
          ) : (
          <input
            readOnly
            value={'There are no todos! Yay!'}
            className='no-todos-imp'
          >
          </input>
        )}
    </ul>
  );
}

export default TodosList;