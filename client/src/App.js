import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import * as apiService from './apiService';

function App () {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    apiService.getTime()
      .then((res) => {
        setCurrentTime(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  return (
    <div className="App">

      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <p>The current time is {currentTime}.</p>

      </header>
    </div>
  );
}

export default App;
