import './header.css';
import { BsSunFill } from "react-icons/bs";
import { BsFillMoonStarsFill } from "react-icons/bs";
function Header ({ theme, setTheme }) {


  const handelClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <header className='app-header'>
      <h1>Todo List</h1>

      <div>
        {theme === 'dark' ?
          <BsSunFill
            className='sun-btn'
            role='button'
            onClick={handelClick}
          ></BsSunFill>
          :
          <BsFillMoonStarsFill
            className='moon-btn'
            role='button'
            onClick={handelClick}
          ></BsFillMoonStarsFill>
        }
      </div>

    </header>
  );
}

export default Header;