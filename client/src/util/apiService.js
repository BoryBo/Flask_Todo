let SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getAllTodos = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/get-all`);
    if (!response.ok) {
      throw new Error(`HTTP error:
      * ${response.status} * ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }
  catch (err) {
    throw err;
  }
};

export const addTodo = async (newTodo) => {
  try {
    const response = await fetch(`${SERVER_URL}/add`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newTodo)
    });
    if (!response.ok) {
      throw new Error(`HTTP error:
      * ${response.status} * ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

export const editTodo = async (id, field, value) => {
  try {
    const response = await fetch(`${SERVER_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ [field]: value })
    });

    if (!response.ok) {
      throw new Error(`HTTP error:
      * ${response.status} * ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error:
      * ${response.status} * ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }
  catch (err) {
    console.error(err);
    throw err;
  }
};

