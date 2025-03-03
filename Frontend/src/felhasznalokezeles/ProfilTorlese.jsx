import { useState } from 'react';
import Stilus from './Felh.css';

function Kijelentkezes() {
    const [biztDisp, setBiztDisp] = useState('none');

  function biztos(){
    setBiztDisp('grid');

  }

  function megsem(){
    setBiztDisp('none')
  }

  return (
    <div className='profTorlese'>
      <div className='torlCim'>Profil törlése</div>
      <div className='torlesGomb' onClick={biztos}>Törlés</div>
      <div className='biztosan' style={{display: biztDisp}}>
        <div className='biztSzoveg'>Biztosan törli a felhasználói profilt ?</div>
        <div className='biztGomOK'>
            <div>Igen</div>
            <div onClick={megsem}>Nem</div>
        </div>
      </div>
    </div>
  )
}

export default Kijelentkezes;