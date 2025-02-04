import Stilus from './Felh.css';

function Beallitasok() {

  

  return (
    <div className='teljesBeallitas'>
        <div className='menuOszlop'>
            <div className='oszlopElem'>Általános</div>
            <div className='oszlopElem'>Biztonság</div>
        </div>

        <div className='beallitasiReszletek'>

            <div className='altalanos'>
                <div className="menuEle">
                    <p className="beallitasNeve">Téma:</p>
                    <select>
                        <option value="dark">Sötét</option>
                        <option value="light">Világos</option>
                    </select>
                </div>


                <button className='altalnosMentes'>Mentés</button>
            </div>  

        </div>
    </div>
  );
}

export default Beallitasok;
