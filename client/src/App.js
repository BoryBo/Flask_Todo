import { useState, useEffect } from 'react';
import * as apiService from './util/apiService';
import Footer from './Components/Footer';
import Header from './Components/Header';
import TodosList from './Components/TodosList';
import SearchBar from './Components/SearchBar';
import AddItem from './Components/AddItem';

function App () {
  const [todos, setTodos] = useState([]);



  return (
    <main className="App">
      <Header />

      <div className='add-and-search-div'>
        <AddItem
          todos={todos}
          setTodos={setTodos}
        />
        <SearchBar
          todos={todos}
          setTodos={setTodos}
        />

      </div>

      <TodosList
        todos={todos}
        setTodos={setTodos}
      />
      <Footer />
    </main>
  );
}

export default App;
