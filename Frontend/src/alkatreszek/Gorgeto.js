
import { useState, useRef, useEffect } from 'react';
import GorgetoStilus from './Gorgeto.css';
import { Link } from 'react-router-dom';
import Reszletek from './Reszletek';

function Gorgeto({ tema }) {
  const [szuroSzoveg, setSzuroSzoveg] = useState('Szűrő');
  const [elemekBetoltve, setElemekBetoltve] = useState(false);
  const [nyilakElrejtese, setNyilakElrejtese] = useState({ display: 'block' });
  const [menuElrejtese, setMenuElrejtese] = useState({ display: 'none' });
  var [tartalom, setTartalom] = useState('További részletek');

  var atmenetiKepUrl='/kepek/kep.png';
  // Különböző témák megkölönböztetési adatai
  const AlkatTulajdonsagok = {
    'Videókártyák': [ { rovidit: 'v' } ],
    'Processzorok': [ { rovidit: 'p' } ],
    'RAM-ok': [ { rovidit: 'r' } ],
    'Operációsrendszerek': [ { rovidit: 'o' } ],
    'Alaplapok': [ { rovidit: 'a' } ]
  };

  const MindenAdat = {
    'Videókártyák': [],
    'Processzorok': [],
    'RAM-ok': [],
    'Operációsrendszerek': [],
    'Alaplapok': []
  };

  // Adatbázisból kinyert: nevek
  const [betoltV, setBetoltV] = useState(true);
  const [betoltP, setBetoltP] = useState(true);
  const [betoltO, setBetoltO] = useState(true);
  const [betoltR, setBetoltR] = useState(true);
  const [betoltA, setBetoltA] = useState(true);
  const [betoltMind, setBetoltMind] = useState(true);
  const [kivalasztottNev, setKivalasztottNev] = useState('');
  var [kivNev, setKivNev] = useState([]);

  // A videókártya adatok lekérése
  async function getMindenVideokartya() {
      try {
        const response = await fetch("https://localhost:44316/api/Videokartya");
        const data = await response.json();
        MindenAdat['Videókártyák'].length = 0;
        data.forEach(x => {
          MindenAdat['Videókártyák'].push(x);
        });
        setBetoltV(false);
      } catch (error) {
        console.error(error);
      }
  }
  useEffect(() => { getMindenVideokartya(); }, [betoltV]);

  // A processzor adatok lekérése
  async function getMindenProcesszor() {
      try {
        const response = await fetch("https://localhost:44316/api/Processzor");
        const data = await response.json();
        MindenAdat['Processzorok'].length = 0;
        data.forEach(x => {
          MindenAdat['Processzorok'].push(x);
        });
        setBetoltP(false);
      } catch (error) {
        console.error(error);
      }
  }
  useEffect(() => { getMindenProcesszor(); }, [betoltP]);

  // A Op rendszer adatok lekérése
  async function getMindenOpRendszer() {
      try {
        const response = await fetch("https://localhost:44316/api/Oprendszer");
        const data = await response.json();
        MindenAdat['Operációsrendszerek'].length = 0;
        data.forEach(x => {
          MindenAdat['Operációsrendszerek'].push(x);
        });
        setBetoltO(false);
      } catch (error) {
        console.error(error);
      }
  }
  useEffect(() => { getMindenOpRendszer(); }, [betoltO]);

  // A ram adatok lekérése
  async function getMindenRam() {
      try {
        const response = await fetch("https://localhost:44316/api/Ram");
        const data = await response.json();
        MindenAdat['RAM-ok'].length = 0;
        data.forEach(x => {
          MindenAdat['RAM-ok'].push(x);
        });
        setBetoltR(false);
      } catch (error) {
        console.error(error);
      }
  }
  useEffect(() => { getMindenRam(); }, [betoltR]);

  // A alaplap adatok lekérése
  async function getMindenAlaplap() {
      try {
        const response = await fetch("https://localhost:44316/api/Alaplap");
        const data = await response.json();
        MindenAdat['Alaplapok'].length = 0;
        data.forEach(x => {
          MindenAdat['Alaplapok'].push(x);
        });
        setBetoltA(false);
      } catch (error) {
        console.error(error);
      }
  }
  useEffect(() => { getMindenAlaplap(); }, [betoltA]);

  var [temaAdatok, setTemaAdatok] = useState(AlkatTulajdonsagok[tema]);

  var [sajatAdatok, setSajatAdatok] = useState(MindenAdat[tema] || []);
  useEffect(() => {
    setSajatAdatok(MindenAdat[tema] || []);
  }, [tema]);
  var [Mind, setMind] = useState([]);
  const [szurtAlk, setSzurtAlk] = useState([]);

  function letezesVizsgalat(){
    if(!(betoltV && betoltP && betoltO && betoltR && betoltA)){
      setBetoltMind(false);
    }
  }
  useEffect(() => { 
    letezesVizsgalat();
  }, [ betoltV, betoltP, betoltO, betoltR, betoltA ]);

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

  function menuMegnyitas() {
    if (!elemekBetoltve) {
      setElemekBetoltve(true);
      setSzuroSzoveg('X');
      setNyilakElrejtese({ display: 'none' });
      setMenuElrejtese({ display: 'block' });
    } else {
      setElemekBetoltve(false);
      setSzuroSzoveg('Szűrő');
      setNyilakElrejtese({ display: 'block' });
      setMenuElrejtese({ display: 'none' });
    }
  }

  var [reszTartalom, setReszTartalom] = useState({ display: 'none' });
  var [reszletNyitva, setReszletNyitva] = useState(false);
  function reszletMenu(alkatNeve) {
    setKivalasztottNev(alkatNeve);
    setKivNev(sajatAdatok.filter(x => x.Nev == alkatNeve)[0]);
    setReszletNyitva(!reszletNyitva);
    if (!reszletNyitva) {
      setReszTartalom({ display: 'block' });
      setReszletNyitva(true);
    } else {
      setReszTartalom({ display: 'none' });
      setReszletNyitva(false);
    }
  }
  function bezar(){
    setReszletNyitva(!reszletNyitva);
    if (!reszletNyitva) {
      setReszTartalom({ display: 'block' });
      setReszletNyitva(true);
    } else {
      setReszTartalom({ display: 'none' });
      setReszletNyitva(false);
    }
  }

  var [keresettNev, setKeresettNev] = useState('');
  function nevSzures() {
    setSzurtAlk([]);
    if (keresettNev !== '') {
      const nevreSzurt = sajatAdatok.filter(x => x.Nev.toLocaleLowerCase().includes(keresettNev.toLocaleLowerCase()));
      setSzurtAlk(nevreSzurt);
    } else {
      setSzurtAlk(sajatAdatok);
    }
  }
  useEffect(() => {
    nevSzures();
  }, [keresettNev]);

  function elemekBetoltese() {
    Mind.length = 0;
  
    temaAdatok = AlkatTulajdonsagok[tema];
    const AppIndex = szurtAlk.length;
  
    for (let i = 0; i < AppIndex; i++) {
      const alkatNeve = szurtAlk[i].Nev;
      const adat = { tipus: temaAdatok[0].rovidit, id: temaAdatok[0].id };
      Mind.push(
        <div className="korKepKeret" key={i}>
          <img src={atmenetiKepUrl} className="korKep" alt="Kép" />
          <h4 className="alkatNeve">{alkatNeve}</h4>
          <button className='reszletGomb' onClick={() => reszletMenu(alkatNeve)}>{tartalom}</button>
        </div>
      );
    }

    return Mind.map((x) => x);
  }
  
  useEffect(() => {
    if (!betoltMind) {
      elemekBetoltese();
    }
  }, [szurtAlk, betoltMind]);

  function megsem(){
    setKeresettNev('');
  }

  return (
    <div className='gorgetoDiv'>
      <div className='container'>
        <div className='cim_Menu'>
          <p className='cim'>{tema}</p>
          <button className='szuroGomb' onClick={menuMegnyitas}>{szuroSzoveg}</button>
        </div>
        <div className='szuroMenu' style={menuElrejtese}>
          <div>
            <h2>Név:</h2>
            <input type='text' id="nevInput" value={keresettNev} onChange={(e) => { setKeresettNev(e.target.value); }}></input>
          </div>
          <button className='kereses' onClick={megsem}>Mégsem</button>
        </div>
        <div className='alkatrKeret' ref={gorgetoContainer}>

          {betoltMind ? (<p className='hianyUzi'>Betöltés folyamatban!</p>) : (elemekBetoltese())}

          <button className="balraNyil" onClick={gorgetoLeft} style={nyilakElrejtese}>&#8592;</button>
          <button className="jobbraNyil" onClick={gorgetoRight} style={nyilakElrejtese}>&#8594;</button>
        </div>
      </div>
      <div className='reszletek' style={reszTartalom}>
        <div className='menuCimsor'>
          <button className='szuroGomb' onClick={bezar}>X</button>
        </div>
        <Reszletek adat={kivNev}></Reszletek>
      </div>
    </div>
    
  );
}

export default Gorgeto;