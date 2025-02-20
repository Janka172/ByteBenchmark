import { useState, useEffect } from 'react';
import OszlopokStilus from './Oszlopok.css';
import AppStilus from '../App.css';
import Alkik from './Alkik';
import Bejelentkezes from '../felhasznalokezeles/Bejelentkezes';

function Oszlopok() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  return (
    <div className="ketOszlop">
      <div className="balOszlop">
      {loggedInUser ? (
        <div className="szoveg">
          <p>
            A Byte Benchmark weboldalala lehetővé teszi a felhasználók számára, hogy egy-egy alkalmazás futtatásához milyen környezetre van szüksége, valamint a saját gépe milyen alkalmazásokat képes megfelelő minőségben futtatni.
            <br />
            <i>Regisztráció esetén alkalma adódik új alkalmazások felvételéhez is.</i>
          </p>
          <p>
            Továbbá lehetőséget biztosítunk arra is, hogy összeállíthasson egy saját setupot, ezzel segítve hogy megtalálja az egymással kompatibilis eszközöket.
            <br />
            <i>Regisztráció esetén alkalma adódik új alkatrészek felvételéhez is.</i>
          </p>
          <p>
            Oldalunkkal segítséget szeretnénk nyújtani azoknak, akik az informatikában nem jártasak, de szeretnének egy számukra megfelelő gépet összeállítani.
            <br />
            Valamint megbizonyosodni arról, hogy ez az általuk választott gép alkalmas az általa használt alkalmazások, játékok megfelelő minőségben történő futtatására.
          </p>
        </div>
      ) : (
        <div className='bejMenu'>
          <Bejelentkezes />
          <p className='megnincs'>Még nincs profilod ?</p>
          <a href="/oldalak/Reg" className='reg'>Regisztrálj !</a>
        </div>
      )}
    </div>
      <div className="jobbOszlop">
        <Alkik></Alkik>
      </div>
    </div>
  );
}

export default Oszlopok;
//<Bejelentkezes />