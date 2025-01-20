import { useState, useRef, useEffect } from 'react';
import SajatStilus from './Sajat.css';
import { Link } from 'react-router-dom';


function Sajat() {
  // Adatbázisból kinyert: nevek
  const [mindenVideokartya, setMindenVideokartya] = useState([]);
  const [betoltV, setBetoltV] = useState(true);
  const [mindenProcesszor, setMindenProcesszor] = useState([]);
  const [betoltP, setBetoltP] = useState(true);
  const [mindenOpRendszer, setMindenOpRendszer] = useState([]);
  const [betoltO, setBetoltO] = useState(true);
  const [mindenRam, setMindenRam] = useState([]);
  const [betoltR, setBetoltR] = useState(true);
  const [mindenAlaplap, setMindenAlaplap] = useState([]);
  const [betoltA, setBetoltA] = useState(true);

  const [kivVideokartya, setKivalasztottVideokartya] = useState({ id: 0, nev: '' });
  const [kivProcesszor, setKivalasztottProcesszor] = useState({ id: 0, nev: '' });
  const [kivOpRendszer, setKivalasztottOpRendszer] = useState({ id: 0, nev: '' });
  const [kivRam, setKivalasztottRam] = useState({ id: 0, nev: '' });
  const [kivAlaplap, setKivalasztottAlaplap] = useState({ id: 0, nev: '' });
  
  const [aktuVideokartya, setAktuVideokartya] = useState(mindenVideokartya[0]);
  const [aktuProcesszor, setAktuProcesszor] = useState(mindenProcesszor[0]);
  const [aktuOpRendszer, setAktuOpRendszer] = useState(mindenOpRendszer[0]);
  const [aktuRam, setAktuRam] = useState(mindenRam[0]);
  const [aktuAlaplap, setAktuAlaplap] = useState(mindenAlaplap[0]);

  // A vidókártya adatok lekérése
  async function getMindenVideokartya() {
    try {
      const response = await fetch("https://localhost:44316/api/Videokartya");
      const data = await response.json();
      setMindenVideokartya(data);
      setBetoltV(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { getMindenVideokartya(); }, [betoltA]);

  // A processzor adatok lekérése
  async function getMindenProcesszor() {
    try {
      const response = await fetch("https://localhost:44316/api/Processzor");
      const data = await response.json();
      setMindenProcesszor(data);
      setBetoltP(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { getMindenProcesszor(); }, [betoltA]);

  // A Op rendsze4r adatok lekérése
  async function getMindenOpRendszer() {
    try {
      const response = await fetch("https://localhost:44316/api/Oprendszer");
      const data = await response.json();
      setMindenOpRendszer(data);
      setBetoltO(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { getMindenOpRendszer(); }, [betoltA]);

  // A ram adatok lekérése
  async function getMindenRam() {
    try {
      const response = await fetch("https://localhost:44316/api/Ram");
      const data = await response.json();
      setMindenRam(data);
      setBetoltR(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { getMindenRam(); }, [betoltA]);

  // A alaplap adatok lekérése
  async function getMindenAlaplap() {
    try {
      const response = await fetch("https://localhost:44316/api/Alaplap");
      const data = await response.json();
      setMindenAlaplap(data);
      setBetoltA(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { getMindenAlaplap(); }, [betoltA]);

  // Csak akkor fut le, ha minden adat betöltődött
  function mindenBetolotott() {
    const valasztottVideokartya=mindenVideokartya[0];
    setAktuVideokartya(valasztottVideokartya);
    const valasztottProcesszor=mindenProcesszor[0];
    setAktuProcesszor(valasztottProcesszor);
    const valasztottOpRendszer=mindenOpRendszer[0];
    setAktuOpRendszer(valasztottOpRendszer);
    const valasztottRam=mindenRam[0];
    setAktuRam(valasztottRam);
    const valasztottAlaplap=mindenAlaplap[0];
    setAktuAlaplap(valasztottAlaplap);
    console.log(aktuAlaplap)
  }
  useEffect(() => {
    if (!betoltV && !betoltP && !betoltO && !betoltR && !betoltA) {
      mindenBetolotott();
    }
  }, [betoltV, betoltP, betoltO, betoltR, betoltA]);

  const valtozoVidk = (e) => {
    const aktuNev = e.target.value;
    const valasztottVideokartya = mindenVideokartya.find(x => x.Nev === aktuNev);
    setAktuVideokartya(valasztottVideokartya);
  };

  const valtozoProc = (e) => {
    const aktuNev = e.target.value;
    const valasztottProcesszor=mindenProcesszor.find(x => x.Nev === aktuNev);
    setAktuProcesszor(valasztottProcesszor);
  };

  const valtozoOpRend = (e) => {
    const aktuNev = e.target.value;
    const valasztottOpRendszer=mindenOpRendszer.find(x => x.Nev === aktuNev);
    setAktuOpRendszer(valasztottOpRendszer);
  };

  const valtozoRam = (e) => {
    const aktuNev = e.target.value;
    const valasztottRam=mindenRam.find(x => x.Nev === aktuNev);
    setAktuRam(valasztottRam);
  };

  const valtozoAlaplap = (e) => {
    const aktuNev = e.target.value;
    const valasztottAlaplap=mindenAlaplap.find(x => x.Nev === aktuNev);
    setAktuAlaplap(valasztottAlaplap);
  };

  function kivalasztVidk(){
    setKivalasztottVideokartya(aktuVideokartya);
  };

  function kivalasztProc(){
    setKivalasztottProcesszor(aktuProcesszor);
  }

  function kivalasztOpRend(){
    setKivalasztottOpRendszer(aktuOpRendszer);
  }

  function kivalasztRam(){
    setKivalasztottRam(aktuRam);
  }

  function kivalasztAlaplap(){
    setKivalasztottAlaplap(aktuAlaplap);
  }

  const gorgetoContainer = useRef(null);
  const gorgetoLeft = () => {
      gorgetoContainer.current.scrollBy({
          top: 0,
          left: -300,
      });
  };
  const gorgetoRight = () => {
      gorgetoContainer.current.scrollBy({
          top: 0,
          left: 300,
      });
  };

  const [Mind, setMind] = useState([]);
  const [ottVanVagyNem, setOttVanVagyNem] = useState('none');
  function listazas() {
    if(kivVideokartya.id!='-1' && kivProcesszor.id!='-1' && kivOpRendszer.id!='-1' && kivRam.id!='-1' && kivAlaplap.id!='-1'){
      setOttVanVagyNem('block');
      var Appok = [{'kepEleres':'/kepek/kep.png', 'nev':'Progi Neve', 'kat':'Kategória Neve', 'id':'0'}];
      const AppIndex = 20;
      let tempMind = [];
      for (let i = 0; i < AppIndex; i++) {
        const adat = { id: Appok[0].id };
        tempMind.push(
          <div className="korKepKeret" key={i}>
            <img src={Appok[0].kepEleres} className="korKep" alt="App kép" />
            <h4 className="appNeve">{Appok[0].nev}</h4>
            <h5 className='katNeve'>{Appok[0].kat}</h5>
            <Link to='/oldalak/AlkalmazasReszletek' state={adat}>
              <button className='reszletGomb'>További részletek</button>
            </Link>
          </div>
        );
      }
      setMind(tempMind);
    }
  }

  return (
    <div className='teljesSajat'>
      <div className='kivalasztottak'>
        <h1>Kiválasztott alkatrészek</h1>

        <div className='sor'>
          <h2 className='soreCime'>Videókártya:</h2>
          <h2 className='soreCime'>{kivVideokartya.Nev}</h2>
        </div>

        <div className='sor'>
          <h2 className='soreCime'>Processzor:</h2>
          <h2 className='soreCime'>{kivProcesszor.Nev}</h2>
        </div>

        <div className='sor'>
          <h2 className='soreCime'>Operációsrendszer:</h2>
          <h2 className='soreCime'>{kivOpRendszer.Nev}</h2>
        </div>

        <div className='sor'>
          <h2 className='soreCime'>Ram:</h2>
          <h2 className='soreCime'>{kivRam.Nev}</h2>
        </div>

        <div className='sor'>
          <h2 className='soreCime'>Alaplap:</h2>
          <h2 className='soreCime'>{kivAlaplap.Nev}</h2>
        </div>
        <button className='szur' onClick={listazas}>Futtatható Alkalmazások Megjelenítése</button>
      </div>

      <div className='kompat' style={{ display: ottVanVagyNem }}>
        <div className='alkatrKeret' ref={gorgetoContainer}>
          {Mind}
          <button className="balraNyil" onClick={gorgetoLeft}>&#8592;</button>
          <button className="jobbraNyil" onClick={gorgetoRight}>&#8594;</button>
        </div>
      </div>

      <div className='kivalszto'>
        <h1>Kiválasztható alkatrészek</h1>

        <div className='kivSor'>
          <h2 className='soreCime'>Videókártya:</h2>
          <select className='combo' onChange={valtozoVidk}>
            {betoltV ? (<option>Betöltés...</option>) : (
              mindenVideokartya.map((vid, index) => (
              <option value={vid.Nev} key={index}>{vid.Nev}</option> 
            )))}
          </select>
          <button className='sajGomb' onClick={kivalasztVidk}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'v', 'id':aktuVideokartya}}><button className='sajGomb'>További részletek</button></Link>
        </div>

        <div className='kivSor'>
          <h2 className='soreCime'>Processzor:</h2>
          <select className='combo' onChange={valtozoProc}>
            {betoltP ? (<option>Betöltés...</option>) : (
              mindenProcesszor.map((proc, index) => (
              <option value={proc.Nev} key={index}>{proc.Nev}</option> 
            )))}
          </select>
          <button className='sajGomb' onClick={kivalasztProc}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'p', 'id':aktuProcesszor}}><button className='sajGomb'>További részletek</button></Link>
        </div>

        <div className='kivSor'>
          <h2 className='soreCime'>Operációsrendszer:</h2>
          <select className='combo' onChange={valtozoOpRend}>
            {betoltO ? (<option>Betöltés...</option>) : (
                mindenOpRendszer.map((op, index) => (
                <option value={op.Nev} key={index}>{op.Nev}</option> 
              )))}
          </select>
          <button className='sajGomb' onClick={kivalasztOpRend}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'o', 'id':aktuOpRendszer}}><button className='sajGomb'>További részletek</button></Link>
        </div>

        <div className='kivSor'>
          <h2 className='soreCime'>Ram:</h2>
          <select className='combo' onChange={valtozoRam}>
            {betoltR ? (<option>Betöltés...</option>) : (
              mindenRam.map((ram, index) => (
              <option value={ram.Nev} key={index}>{ram.Nev}</option> 
            )))}
          </select>
          <button className='sajGomb' onClick={kivalasztRam}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'r', 'id':aktuRam}}><button className='sajGomb'>További részletek</button></Link>
        </div>

        <div className='kivSor'>
          <h2 className='soreCime'>Alaplap:</h2>
          <select className='combo' onChange={valtozoAlaplap}>
            {betoltA ? (<option>Betöltés...</option>) : (
              mindenAlaplap.map((alap, index) => (
              <option value={alap.Nev} key={index}>{alap.Nev}</option> 
            )))}
          </select>
          <button className='sajGomb' onClick={kivalasztAlaplap}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'a', 'id':aktuAlaplap}}><button className='sajGomb'>További részletek</button></Link>
        </div>
      </div>

    </div>
  );
}

export default Sajat;