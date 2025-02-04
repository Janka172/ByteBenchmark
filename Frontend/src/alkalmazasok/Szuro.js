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
  const [mindenOpRendszer, setMindenOpRendszer] = useState([]);
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
  useEffect(() => { getMindenOpRendszer(); }, []);
  

  const [nev, setNev] = useState('');
  const [kategoria, setKategoria] = useState('-');
  const [videokartya, setVideokartya] = useState('-');
  const [processzor, setProcesszor] = useState('-');
  const [opRendszer, setOpRendszer] = useState('-');
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
  const [displ, setDispl] = useState('block');
  const [megnyitva, setMegnyitva] = useState(true);

  useEffect(() => {
    if (kicsie) {
      setMegnyitva(false);
      setDispl('none');
      setHatter('rgba(196, 84, 84, 0)');
    } else {
      setMegnyitva(true);
      setDispl('block');
      setHatter('rgba(201, 95, 95, 0.8)');
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
    setOpRendszer('-');
    setRam('');
    setTarhely('');

    var adatok = {
      nev: '',
      kategoria: '-',
      videokartya: '-',
      processzor: '-',
      opRendszer: '-',
      ram: '',
      tarhely: '',
    };
    setKeresesiAdatok(adatok);
  }

  const { setKeresesiAdatok } = useKeresesiAdatok();
  function keres(){
    var adatok = {
      nev: nev,
      kategoria: kategoria,
      videokartya: videokartya,
      processzor: processzor,
      opRendszer: opRendszer,
      ram: ram,
      tarhely: tarhely,
    };
    setKeresesiAdatok(adatok);
  }

  return (
    <div className='filter' style={{ backgroundColor: hatter }}>
      <div>
        <div className='nagyMeret'>
          <h1>Szűrő beállítások</h1>
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
          {betoltV ? (<option>Betöltés...</option>) : (
            mindenVideokartya.map((vid, index) => (
              <option value={vid.Nev} key={index}>{vid.Nev}</option> 
            )))}
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
        <p>Operációs rendszer:</p>
        <select id='opRendszerCombo' value={opRendszer} onChange={(e) => setOpRendszer(e.target.value)}>
          <option value='-' key='-1'>-</option>
          {betoltO ? (<option>Betöltés...</option>) : (
            mindenOpRendszer.map((op, index) => (
              <option value={op.Nev} key={index}>{op.Nev}</option> 
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
  );
}

export default Szuro;