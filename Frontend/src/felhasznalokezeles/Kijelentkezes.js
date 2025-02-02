import Stilus from './Felh.css';

function Kijelentkezes() {

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  return <button onClick={handleLogout} className='kijGomb'>Kijelentkezés</button>;
}

export default Kijelentkezes;
