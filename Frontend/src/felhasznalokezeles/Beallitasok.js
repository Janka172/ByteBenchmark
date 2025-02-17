import { useState } from 'react';
import Stilus from './Felh.css';

function Beallitasok() {
    var [altDisp, setAltDisp]=useState('none');
    var [biztDisp, setBiztDisp]=useState('none');

    document.body.onload=alapMenuKivalasztas();
    function alapMenuKivalasztas(){
        document.getElementById('alt').style.backgroundColor = 'rgb(233, 203, 203)';
        altDisp='grid';
        biztDisp='none';
    }

    function altKiv(){
        document.getElementById('alt').style.backgroundColor = 'rgb(233, 203, 203)';
        document.getElementById('bizt').style.backgroundColor = '';
        menuMegjelenites();
    }
    function biztKiv(){
        document.getElementById('bizt').style.backgroundColor = 'rgb(233, 203, 203)';
        document.getElementById('alt').style.backgroundColor = '';
        menuMegjelenites();
    }
  
    function menuMegjelenites(){
        if(document.getElementById('alt').style.backgroundColor == 'rgb(233, 203, 203)'){
            altDisp='grid';
            biztDisp='none';
        }
        else if(document.getElementById('bizt').style.backgroundColor == 'rgb(233, 203, 203)'){
            altDisp='none';
            biztDisp='grid';
        }
    }

  return (
    <div className='teljesBeallitas'>
        <div className='menuOszlop'>
            <div className='oszlopElem' id='alt' onClick={altKiv}>Általános</div>
            <div className='oszlopElem' id='bizt' onClick={biztKiv}>Biztonság</div>
        </div>

        <div className='beallitasiReszletek'>

            <div className='altalanos' style={{display: altDisp}}>
                <div className="menuEle">
                    <p className="beallitasNeve">Téma:</p>
                    <select>
                        <option value="dark">Sötét</option>
                        <option value="light">Világos</option>
                    </select>
                </div>


                <button className='altalnosMentes'>Mentés</button>
            </div>

            <div className='biztonsagi' style={{display: biztDisp}}>

            </div>

        </div>
    </div>
  );
}

export default Beallitasok;
