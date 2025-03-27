import React, { useState, useEffect } from 'react';
import SzuroStilus from './Szuro.css';
import { useKeresesiAdatok } from './KeresesiAdatokContext';

function Szuro() {
  // Adatbázisból kinyert: nevek
  const [mindenKategoria, setMindenKategoria] = useState([]);
  const [betoltK, setBetoltK] = useState(true);
  const [mindenVideokartya, setMindenVideokartya] = useState([]);
  const [betoltV, setBetoltV] = useState(true);
  const [mindenProcesszor, setMindenProcesszor] = useState([]);
  const [betoltP, setBetoltP] = useState(true);
  const [betoltO, setBetoltO] = useState(true);

  // A kategoria adatok lekérése
  async function getMindenKategoria() {
    try {
      const response = await fetch("https://localhost:44316/api/Kategoria");
      const data = await response.json();
      setMindenKategoria(data);
      setBetoltK(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => { getMindenKategoria(); }, []);

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
  useEffect(() => { getMindenVideokartya(); }, []);

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
  useEffect(() => { getMindenProcesszor(); }, []);

  const [nev, setNev] = useState('');
  const [kategoria, setKategoria] = useState('-');
  const [videokartya, setVideokartya] = useState('-');
  const [processzor, setProcesszor] = useState('-');
  const [ram, setRam] = useState('');
  const [tarhely, setTarhely] = useState('');

  const [kicsie, setKicsie] = useState(window.innerWidth <= 767);
  useEffect(() => {
    const handleResize = () => {
      setKicsie(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [hatter, setHatter] = useState('rgba(196, 84, 84, 0.8)');
  const [displ, setDispl] = useState('none');
  const [megnyitva, setMegnyitva] = useState(true);
  const [feltDisp, setFeltDisp] = useState('none');
  const [mentDisp, setMentDisp] = useState('none');
  const [gombDisp, setGombDisp] = useState('grid');
  const [setup, setSetup] = useState([]);
  const [tablazat, setTablazat] = useState([]);
  const [betolS, setBetoltS] = useState(true);

  useEffect(() => {
    if (kicsie) {
      setMegnyitva(false);
      setDispl('none');
      setHatter('rgba(196, 84, 84, 0)');
    } else {
      setMegnyitva(true);
      setDispl('block');
      setHatter('rgba(201, 95, 95, 0)');
    }
  }, [kicsie]);

  function menuMegnyitas() {
    if (!megnyitva) {
      setMegnyitva(true);
      setDispl('block');
      setHatter('rgba(201, 95, 95, 0.8)');
    } else {
      setMegnyitva(false);
      setDispl('none');
      setHatter('rgba(196, 84, 84, 0)');
    }
  }

  function mezokTorlese() {
    setNev('');
    setKategoria('-');
    setVideokartya('-');
    setProcesszor('-');
    setRam('');
    setTarhely('');

    var adatok = {
      nev: '',
      kategoria: '-',
      videokartya: '-',
      processzor: '-',
      ram: '',
      tarhely: '',
    };
    setKeresesiAdatok(adatok);

    if(kicsie) menuMegnyitas();
    setFeltDisp('none');
    setGombDisp('grid');
    setHatter('rgba(201, 95, 95, 0)');
  }

  const { setKeresesiAdatok } = useKeresesiAdatok();
  function keres(){
    var adatok = {
      nev: nev,
      kategoria: kategoria,
      videokartya: videokartya,
      processzor: processzor,
      ram: ram,
      tarhely: tarhely,
    };
    setKeresesiAdatok(adatok);
  }

  function feltetelMegadas(){
    if(!kicsie) setHatter('rgba(201, 95, 95, 0.8)');
    setFeltDisp('grid');
    setGombDisp('none');
  }

  async function mentettek(){
    setMentDisp('grid');
    setGombDisp('none');
    setHatter('rgba(201, 95, 95, 0.8)');

    getSetup();
  }

  async function getSetup() {
    try{
      const response = await fetch(`https://localhost:44316/api/Setup`);
      const data = await response.json();
      await setSetup(data.filter(x => x.Gepigeny.split('.')[0]==JSON.parse(localStorage.getItem('loggedInUser')).Id));
      setBetoltS(false);
    } catch (error){
      console.error(error);
    }
  }
  useEffect(() => {
    if(!betolS){
      mentTablaMegj();
    }
  }, [setup]);

  function mentVissza(){
    setMentDisp('none');
    setGombDisp('grid');
    if(kicsie) setHatter('rgba(201, 95, 95, 0)');

    mezokTorlese();
  }

  function mentTablaMegj(){
    let ujMind = [];
    setup.map(x => {
      ujMind.push(
        <div className='setTablaSor' key={x.Gepigeny}>
          <div className='setTablaCella'>{x.Gepigeny.split('.')[1]}</div>
          <div className='setTablaSzur' onClick={() => menettSzures(x)}>Szűrés</div>
        </div>
      )
    });
    setTablazat(ujMind);
  }

  function menettSzures(set){
    var adatok = {
      nev: '',
      kategoria: '-',
      videokartya: `${set.VidekortyaNev} - ${set.VideokartyaVram}`,
      processzor: set.ProcesszorNev,
      ram: set.RamMeret,
      tarhely: ''
    };
    setKeresesiAdatok(adatok);
  }

  return (
    <div className='filter' style={{ backgroundColor: hatter }}>
      <div style={{display: gombDisp}}>
        <div className='szurMenuGomb' onClick={feltetelMegadas}>Szűrési feltételek megadása</div>
        <div className='szurMenuGomb' onClick={mentettek}>Szűrés mentett setupok szerint</div>
      </div>
      
      <div className='feltetlesMenu' style={{display: feltDisp}}>
        <div>
          <div className='nagyMeret'>
            <h1 className='szuroCimsor'>Szűrő beállítások</h1>
          </div>
          <div className='kisMeret'>
            <button className='bezaros' onClick={menuMegnyitas}>Szűrő beállítások</button>
          </div>
        </div>

        <div className='mezo' style={{ display: displ }}>
          <p>Név:</p>
          <input type='text' id="nevInput" value={nev} onChange={(e) => setNev(e.target.value)} />
        </div>

        <div className='mezo' style={{ display: displ }}>
          <p>Kategória:</p>
          <select id='kategoriaCombo' value={kategoria} onChange={(e) => setKategoria(e.target.value)}>
          <option value='-' key='-1'>-</option>
            {betoltK ? (<option>Betöltés...</option>) : (
              mindenKategoria.map((kat, index) => (
                <option value={kat.Nev} key={index}>{kat.Nev}</option> 
              )))}
          </select>
        </div>

        <div className='mezo' style={{ display: displ }}>
          <p>Videókártya:</p>
          <select id='videokartyaCombo' value={videokartya} onChange={(e) => setVideokartya(e.target.value)}>
            <option value='-' key='-1'>-</option>
            {betoltV ? (
              <option>Betöltés...</option>
            ) : (
              mindenVideokartya.map((vid, index) => (
                <option value={`${vid.Nev} - ${vid.vram} GB`} key={index}>
                  {vid.Nev} - {vid.vram} GB
                </option> 
              ))
            )}
          </select>
        </div>

        <div className='mezo' style={{ display: displ }}>
          <p>Processzor:</p>
          <select id='processzorCombo' value={processzor} onChange={(e) => setProcesszor(e.target.value)}>
            <option value='-' key='-1'>-</option>
            {betoltP ? (<option>Betöltés...</option>) : (
              mindenProcesszor.map((proc, index) => (
                <option value={proc.Nev} key={index}>{proc.Nev}</option> 
              )))}
          </select>
        </div>

        <div className='mezo' style={{ display: displ }}>
          <p>RAM (GB):</p>
          <input type='number' value={ram} onChange={(e) => setRam(e.target.value)} />
        </div>

        <div className='mezo' style={{ display: displ }}>
          <p>Tárhely (GB):</p>
          <input type='number' value={tarhely} onChange={(e) => setTarhely(e.target.value)} />
        </div>

        <button className='gombocska' style={{ display: displ }} onClick={keres}>Keresés</button>
        <button className='gombocska' style={{ display: displ }} onClick={mezokTorlese}>Mégsem</button>
      </div>
      
      <div className='mentettMenu' style={{display: mentDisp}}>

        <div className='mentTablazat'>{tablazat.map(x=>x)}</div>

        <button className='gombocska' onClick={mentVissza}>Mégsem</button>
      </div>
    </div>
  );
}

export default Szuro;