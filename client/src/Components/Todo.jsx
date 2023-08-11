import React, { useState } from 'react';
import './todo.css';
import { TiDelete } from "react-icons/ti";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaSave } from "react-icons/fa";
import { editTodo, deleteTodo } from '../util/apiService';
import sortArrByTimestamp from '../util/sortByTimestamp.mjs';

function Todo ({ todo, setTodos, todos, setErr }) {
  const [editMode, setEditMode] = useState(false);

  function handleChange (ev, id) {
    let updatedTodos = todos.map(function (t) {
      if (t.id === id) {

        if (ev.target.name === 'content') {
          return { ...t, [ev.target.name]: ev.target.value };
        }
        if (ev.target.name === 'checked') {
          return { ...t, [ev.target.name]: !t.checked };
        }
      }
      return t;
    });

    setTodos(sortArrByTimestamp(updatedTodos));
  }

  function handleDeleteClick (id) {
    deleteTodo(id)
      .then(() => setTodos(todos.filter(t => t.id !== id)))
      .catch(error => setErr(error));
  }

  function handleSaveClick (id, field, value) {
    value = value.toString();  //bah
    editTodo(id, field, value)
      .then(() => setEditMode(false))
      .catch((e) => setErr(e));
  }

  return (

    <li className='todo-item'>

      {editMode ? (
        <input
          id={`checkb ${todo.id}`}
          type="text"
          name='content'
          defaultValue={todo.content}
          className='edit-input'
          onChange={(ev) => handleChange(ev, todo.id)}
        />
      ) : (
        <label >
          <input
            id={`checkb ${todo.id}`}
            type="checkbox"
            name='checked'
            defaultChecked={todo.checked}
            className='checkbox-inp'
            onChange={(ev) => handleChange(ev, todo.id)}
            onClick={() => handleSaveClick(todo.id, 'checked', !todo.checked)}
          />
          {todo.content}
        </label>
      )}

      {editMode ? (
        <div className='btns'>
          <FaSave
            className='save-btn'
            role='button'
            onClick={() => handleSaveClick(todo.id, 'content', todo.content)}
          />
        </div>
      ) : (
        <div className='btns'>

          <BiSolidEditAlt
            className='edit-btn'
            role='button'
            tabIndex='0'
            onClick={() => setEditMode(true)}
          />
          <TiDelete
            className='del-btn'
            role='button'
            tabIndex='0'
            onClick={() => handleDeleteClick(todo.id)}
          />
        </div>
      )}


    </li>
  );
}

export default Todo;
