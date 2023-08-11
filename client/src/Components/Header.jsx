import './header.css';
import { BsSunFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";


function Header () {

  return (
    <header className='app-header'>
      <h1>Todo List</h1>
      <div>
        <BsSunFill
          className='sun-btn'
          role='button'
        ></BsSunFill>
        <BsFillMoonStarsFill
          className='moon-btn'
          role='button'
        ></BsFillMoonStarsFill>
      </div>

    </header>
  );
}

export default Header;