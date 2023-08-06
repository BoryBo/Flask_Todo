import React from 'react';
import './todo.css';
import { TiDelete } from "react-icons/ti";
import { BiSolidEditAlt } from "react-icons/bi";


function Todo ({ t }) {
  return (
    <li className='todo-item'>

      {t.completed}
      <label>
        <input
          type="checkbox"
          name='todo-cont'
          defaultValue={t.completed}
          className='checkbox-inp '
          checked={t.completed ? "checked" : ''}
        ></input>
      </label>

      {/* <div className="smiley"></div> */}


      <label>
        <input
          className='content-imp'
          type='text'
          defaultValue={t.content}
        ></input>
      </label>

      <div className='btns'>
        <TiDelete
          className='del-btn'
          role='button'
          tabIndex='0'
        />
        <BiSolidEditAlt
          className='edit-btn'
          role='button'
          tabIndex='0'
        />
      </div>

      {/* <h5 className='timestamp'>
        Created at:{` ${(t.timestamp).slice(0, -10).replace('T', ' ')}`}
      </h5> */}

    </li>
  );
}

export default Todo;