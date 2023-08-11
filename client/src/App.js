import { useState, useEffect } from 'react';
import { getAllTodos } from './util/apiService';
import sortArrByTimestamp from './util/sortByTimestamp.mjs';
import Footer from './Components/Footer';
import Header from './Components/Header';
import TodosList from './Components/TodosList';
import SearchBar from './Components/SearchBar';
import AddItem from './Components/AddItem';

function App () {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState('');


  useEffect(() => {
    setLoading(true);
    getAllTodos()
      .then((res) => {
        setTodos(sortArrByTimestamp(res) || res);
      })
      .catch(err => {
        setErr(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);


  return (
    <main className="App">
      <Header />

      <div className='add-and-search-div'>
        <AddItem
          todos={todos}
          setTodos={setTodos}
          setErr={setErr}
        />
        <SearchBar
          todos={todos}
          setTodos={setTodos}
          query={query}
          setQuery={setQuery}
        />
      </div>

      {loading && (
        <p className='loading-mess'>Loading, please wait...</p>
      )}
      {err !== null &&
        <div className='error-mess'>
          <p>Something went wrong: </p>
          <p> {err.message} </p>

        </div>
      }
      {err === null && loading === false &&
        <TodosList
          setLoading={setLoading}
          todos={todos}
          setTodos={setTodos}
          query={query}
          setErr={setErr}
        />
      }
      <Footer />
    </main>
  );
}

export default App;
