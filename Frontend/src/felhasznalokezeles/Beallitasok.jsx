import { useState, useEffect } from 'react';
import Stilus from './Felh.css';
import JelszoModosito from './JelszoModosito';

function Beallitasok() {
  const [altDisp, setAltDisp] = useState('grid');
  const [biztDisp, setBiztDisp] = useState('none');
  const [activeMenu, setActiveMenu] = useState('alt');
  const [ujJelszoMegjelnik, setUjJelszoMegjelnik] = useState('none');
  const [regiJelszoMegjelnik, setregiJelszoMegjelnik] = useState('grid');
  const [vanHiba, setVanHiba] = useState('none');

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
    document.getElementById('hibaU').style.display='none';
  }

  function biztKiv() {
    setActiveMenu('bizt');
    setAltDisp('none');
    setBiztDisp('grid');
    document.getElementById('hibaU').style.display='none';
  }

  const [image, setImage] = useState(null);
  const [atmKep, setAtmKep] = useState(null);

  const kepValasztas = (e) => {
      const file = e.target.files[0];
      if (file) {
          setImage(file);
          setAtmKep(URL.createObjectURL(file)); // Előnézet generálása
      }
  }

  return (
    <div className='teljesBeallitas'>
      <div className='menuOszlop'>
        <div className={`oszlopElem ${activeMenu === 'alt' ? 'active' : ''}`} id='alt' onClick={altKiv} style={{ backgroundColor: activeMenu === 'alt' ? 'rgb(233, 203, 203)' : '' }}>Általános</div>
        <div className={`oszlopElem ${activeMenu === 'bizt' ? 'active' : ''}`} id='bizt' onClick={biztKiv} style={{ backgroundColor: activeMenu === 'bizt' ? 'rgb(233, 203, 203)' : '' }}>Biztonság</div>
      </div>

      <div className='beallitasiReszletek'>
        <div className='hibaUzi' id='hibaU' style={{display: vanHiba}}>
          <p id='hibaSzoveg'></p>
        </div>

        <div className='altalanos' style={{ display: altDisp }}>
          <p className='altBeCim'>Általános Beállitások</p>

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

          <div className="menuEle">
            <p className='beallitasNeve'>Profilkép:</p>
            <input type="file" accept="*" onChange={kepValasztas}/>
            {atmKep && (
                <div className="mt-2">
                    <p className="beallitasNeve">Előnézet:</p>
                    <div className='kepConti'>
                      <img src={atmKep} alt="Előnézet" className="profilElolnezet" />
                    </div>
                </div>
            )}
          </div>

          <button className='altalnosMentes'>Mentés</button>
        </div>

        <div className='biztonsagi' style={{ display: biztDisp }}>
          <JelszoModosito></JelszoModosito>
        </div>
      </div>
    </div>
  );
}

export default Beallitasok;
