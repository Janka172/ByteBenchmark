import Stilus from './Felh.css';
import { Link } from 'react-router-dom';

function Kijelentkezes() {

  function kilep() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
    window.location.href = "/";
  };

  return <Link onClick={kilep} className='kijGomb'>Kijelentkezés</Link>;
}

export default Kijelentkezes;
