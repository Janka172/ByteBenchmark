import React from 'react';
import OszlopokStilus from './Oszlopok.css';
import AppStilus from '../App.css';
import Alkik from './Alkik';

function Oszlopok() {
  return (
    <div className="ketOszlop">
      <div className="balOszlop">
        <div className='szoveg'>
          <p>A Byte Benchmark weboldalala lehetővé teszi a felhasználók számára, hogy egy-egy alkalmazás futtatásához milyen környezetre van szüksége, valamint a saját gépe milyen alkalmazásokat képes megfelelő minőségben futtatni.<br/>
          <i>Regisztráció esetén alkalma adódik új alkalmazások felvételéhez is.</i></p>
          <p>Továbbá lehetőséget biztosítunk arra is, hogy összeállíthatson egy saját setupot, ezzel segítve hogy megtalálja az egymással kompatibilis eszközöket.<br/>
          <i>Regisztráció esetén alkalma adódik új alkatrészek felvételéhez is.</i></p>
          <p>Oldalunkkal segítséget szeretnénk nyújtani azoknak akik az informatikában nem jártasak, de szeretnének egy számukra megfelelő gépet összeállítani.<br/>
          Valamint megbizonyosodni arról, hogy ez az általuk választott gép alkalmas az általa használt alkalmazások, játék megfelelő minőségben történő futtatására.</p>
        </div>    
      </div>
      <div className="jobbOszlop">
        <Alkik></Alkik>
      </div>
    </div>
  );
}

export default Oszlopok;
