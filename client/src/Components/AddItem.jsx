import { useState } from 'react';
import { addTodo } from '../util/apiService';
import './addAndSearch.css';
import sortArrByTimestamp from '../util/sortByTimestamp.mjs';

function AddItem ({ setTodos, todos }) {
  const [newTodo, setNewTodo] = useState({
    content: '',
    checked: false
  });

  function handleChange (e) {
    console.log(e.target.value);
    setNewTodo({ ...newTodo, content: e.target.value });
  }

  function handleAdd (e) {
    if (!newTodo.content.length) return;
    addTodo(newTodo)
      .then(newTodo => {
        let updatedList = [...todos, newTodo];
        setTodos(sortArrByTimestamp(updatedList));
        setNewTodo({
          content: ''
        });
      })
      .catch(e => console.log(e));
  }

  function handleKeyPress (e) {
    if (e.key === 'Enter') {
      handleAdd(e);
    }
  }

  return (
    <>
      <input
        value={newTodo.content}
        onChange={handleChange}
        onBlur={handleAdd}
        onKeyDown={handleKeyPress}
        className='add-search-imp'
        id='add-todo'
        type='text'
        placeholder='Add todo'
      >
      </input>
    </>
  );
}

export default AddItem;