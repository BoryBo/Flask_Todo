import React from 'react';
import './addItem.css';

function AddItem () {
  return (
    <>
      <input
      
        className='top-imp'
        id='add-todo'
        type='text'
        placeholder='Add todo'
      ></input>
    </>
  );
}

export default AddItem;