import Stilus from './Felh.css';

function Kijelentkezes() {

  function kilep() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
    window.location.href = "/";
  };

  return <button onClick={kilep} className='kijGomb'>Kijelentkezés</button>;
}

export default Kijelentkezes;
