import { useState, useEffect } from 'react';
import Stilus from './Felh.css';

function Beallitasok() {
  const [altDisp, setAltDisp] = useState('grid');
  const [biztDisp, setBiztDisp] = useState('none');
  const [activeMenu, setActiveMenu] = useState('alt');

  useEffect(() => {
    alapMenuKivalasztas();
  }, []);

  function alapMenuKivalasztas() {
    setActiveMenu('alt');
    setAltDisp('grid');
    setBiztDisp('none');
  }

  function altKiv() {
    setActiveMenu('alt');
    setAltDisp('grid');
    setBiztDisp('none');
  }

  function biztKiv() {
    setActiveMenu('bizt');
    setAltDisp('none');
    setBiztDisp('grid');
  }

  return (
    <div className='teljesBeallitas'>
      <div className='menuOszlop'>
        <div
          className={`oszlopElem ${activeMenu === 'alt' ? 'active' : ''}`}
          id='alt'
          onClick={altKiv}
          style={{ backgroundColor: activeMenu === 'alt' ? 'rgb(233, 203, 203)' : '' }}
        >
          Általános
        </div>
        <div
          className={`oszlopElem ${activeMenu === 'bizt' ? 'active' : ''}`}
          id='bizt'
          onClick={biztKiv}
          style={{ backgroundColor: activeMenu === 'bizt' ? 'rgb(233, 203, 203)' : '' }}
        >
          Biztonság
        </div>
      </div>

      <div className='beallitasiReszletek'>
        <div className='altalanos' style={{ display: altDisp }}>
          <div className='menuEle'>
            <p className='beallitasNeve'>Téma:</p>
            <select>
              <option value='dark'>Sötét</option>
              <option value='light'>Világos</option>
            </select>
          </div>

          <div className='menuEle'>
            <p className='beallitasNeve'>Felhasználónév:</p>
            <input type='text'></input>
          </div>

          <div className='menuEle'>
            <p className='beallitasNeve'>Kép:</p>
            <input type='img'></input>
          </div>

          <button className='altalnosMentes'>Mentés</button>
        </div>

        <div className='biztonsagi' style={{ display: biztDisp }}>
          {/* Add your security settings here */}
        </div>
      </div>
    </div>
  );
}

export default Beallitasok;
