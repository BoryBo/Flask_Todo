let SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getTime = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/time`);
    if (response.status === 404) {
      throw new Error('Not found');
    }
    if (response.status === 500) {
      throw new Error('Server Error');
    }
    else if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data.time;
  }
  catch (err) {
    console.error("Something went wrong: ", err);
    return err.message;
  }
};

export const getAllTodos = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/get-all`);
    if (response.status === 404) {
      throw new Error('Not found');
    }
    if (response.status === 500) {
      throw new Error('Server Error');
    }
    else if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error("Something went wrong: ", err);
    return err.message;
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await fetch(`${SERVER_URL}/add`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newTodo)
    });
    if (response.status === 404) {
      throw new Error('Not found');
    }
    if (response.status === 500) {
      throw new Error('Server Error');
    }
    else if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error("Something went wrong: ", err);
    return err.message;
  }
};

export const editTodo = async (id, field, value) => {
  try {
    const response = await fetch(`${SERVER_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ [field]: value })
    });
    if (response.status === 404) {
      throw new Error('Not found');
    }
    if (response.status === 500) {
      throw new Error('Server Error');
    }
    else if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error("Something went wrong: ", err);
    return err.message;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 404) {
      throw new Error('Not found');
    }
    if (response.status === 500) {
      throw new Error('Server Error');
    }
    else if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error("Something went wrong: ", err);
    return err.message;
  }
};