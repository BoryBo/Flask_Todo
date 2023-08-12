import { useState, useEffect } from 'react';
import logo from '../util/logo.svg';
import './footer.css';



function Footer () {
  const [currentTime, setCurrentTime] = useState('');

  let d = (new Date(Date.now())).toString().slice(0, -34);
  
  useEffect(() => {
    setTimeout(() => setCurrentTime(d), 1000);
  });


  return (
    <footer className="app-footer">
      <img src={logo} className="snake" alt="logo" />
      <p className='time-par'>{currentTime}</p>
    </footer>
  );
}

export default Footer;
