import { useEffect, useState } from 'react';
import AddItem from './Components/AddItem';
import Footer from './Components/Footer';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import TodosList from './Components/TodosList';
import { getAllTodos } from './util/apiService';
import sortArrByTimestamp from './util/sortByTimestamp.mjs';

function App () {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('light');


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
    <main className="App" data-theme={theme}>
        <Header
          theme={theme}
          setTheme={setTheme}
        />
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
