import { useRef, useEffect, useState, useCallback } from "react";
let SERVER_URL = process.env.REACT_APP_SERVER_URL;

const isValidUser = input => {
  return typeof input === "object"
    && input !== null
    && typeof input.id === "number"
    && typeof input.username === "string";
};

const isValidUsers = users => {
  if (!Array.isArray(users)) {
    return false;
  }
  if (!users.every(user => isValidUser(user))) {
    return false;
  }
  return true;
};

export const App = () => {
  const [users, setUsers] = useState([]);
  const abortController = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const cancel = useCallback(() => {
    abortController?.current?.abort();
  }, [abortController]);

  useEffect(() => {
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    setError(null);
    // setLoading(true);

    fetch(`${SERVER_URL}/users`, {
      signal
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error("Something went wrong"));
    }).then(newUsers => {
      if (!isValidUsers(newUsers)) {
        throw new Error("Wrong response from the server");
      }

      setUsers(newUsers);
    }).catch(error => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);




  return (
    <>
      {loading && (
        <small>Loading, please wait...</small>
      )}
      {error && (
        <small>{error.message}</small>
      )}
      <button onClick={cancel}>Cancel</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
};
