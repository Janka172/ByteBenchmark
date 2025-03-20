import { useState } from 'react';
import Stilus from './Felh.css';

function Kijelentkezes(adat) {
  const [biztDisp, setBiztDisp] = useState('none');

  function biztos(){
    setBiztDisp('grid');
  }

  function megsem(){
    setBiztDisp('none');
  }

  async function getProfilok() {
    try {
      const response = await fetch(`https://localhost:44316/api/Profil`);
      const data = await response.json();
      mentsProfilokatLocalStorage(data);
    } catch (error) {
      console.error(error);
    }
  }
  function mentsProfilokatLocalStorage(profilok) {
    try {
      localStorage.setItem("users", JSON.stringify(profilok));
    } catch (error) {
      console.error("Hiba történt a mentés során:", error);
    }
  }

  async function torles(id) {
    try {
      let nev = (JSON.parse(localStorage.getItem('users'))).find(x=> x.Id==id).Felhasznalonev;
      const response = await fetch(`https://localhost:44316/api/Profil/1?name=${nev}`, {
        method: "DELETE"
      });

      if (response.ok) {
        const torolt = JSON.parse(localStorage.getItem('users')).filter(user => user.Felhasznalonev != nev);
        localStorage.setItem('users', JSON.stringify(torolt));
        if(adat.kileptet=='true') kilep();
        else window.location.reload();
      } else {
        console.error("Hiba történt a törlés során.");
      }
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  }

  function kilep() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <div className='profTorlese'>
      <div className='torlCim'>Profil törlése</div>
      <div className='torlesGomb' onClick={biztos}>Törlés</div>
      <div className='biztosan' style={{display: biztDisp}}>
        <div className='biztSzoveg'>Biztosan törli a felhasználói profilt ?</div>
        <div className='biztGomOK'>
            <div onClick={() => torles(adat.kidobando)}>Igen</div>
            <div onClick={megsem}>Nem</div>
        </div>
      </div>
    </div>
  )
}

export default Kijelentkezes;