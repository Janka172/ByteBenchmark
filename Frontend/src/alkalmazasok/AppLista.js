import React, { useState, useEffect } from 'react';
import { useKeresesiAdatok } from './KeresesiAdatokContext';
import { Link } from 'react-router-dom';
import AppListaStilus from './AppLista.css';

function AppLista() {
  var atmenetiKepLink = '/kepek/kep.png';
  
  const [mindenApp, setMindenApp] = useState([]);
  const [szurtApp, setSzurtApp] = useState([]);
  const [betoltA, setBetoltA] = useState(true);
  const [setup, setSetup] = useState([]);
  //const [aktuSetup, setAktuSetup] = useState('');
  const [betoltS, setBetoltS] = useState(true);

  const  feltetel  = useKeresesiAdatok();
  useEffect(() => {
    setSzurtApp(mindenApp);
    szur();
  }, [feltetel]);

  async function getMindenApp() {
    try {
      const response = await fetch('https://localhost:44316/api/Applikacio');
      const data = await response.json();
      setMindenApp(data);
      setSzurtApp(data);
      setBetoltA(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {getMindenApp();}, []);

  async function getSetup() {
    try{
        const response = await fetch(`https://localhost:44316/api/Setup`);
        const data = await response.json();
        setSetup(data);
        setBetoltS(false);
        console.log(data)
    } catch (error){
        console.error(error);
    }
  }
  //useEffect(() => { getSetup(); }, []);

  var Mind = [];
  function mindenElemBetoltese() {
    var AppIndex = szurtApp.length;
    for (let i = 0; i < AppIndex; i++) {
      const adat = { nev: szurtApp[i].Nev };
      Mind.push(
        <div className="korKepKeret alKorKepKeret" key={i}>
          <img src={atmenetiKepLink} className="korKep" />
          <h4 className="appNeve">{szurtApp[i].Nev}</h4>
          <Link to="/oldalak/AlkalmazasReszletek" state={adat}>
            <button className="reszletGomb">További részletek</button>
          </Link>
        </div>
      );
    }
    return Mind.map((x) => x);
  }

  function nevSzures() {
    if(feltetel.keresesiAdatok.nev != ''){
      console.log(szurtApp)
      var nevreSzurt = szurtApp.filter(x => x.Nev.includes(feltetel.keresesiAdatok.nev));
      setSzurtApp(nevreSzurt);
    }
  }

  function kategoriaSzures() {
    if(feltetel.keresesiAdatok.kategoria != '-'){
      var katraSzurt = szurtApp.filter(x => x.KategoriaNev == feltetel.keresesiAdatok.kategoria);
      setSzurtApp(katraSzurt)
    } 
  }

  const [hasVid, setHasVid] = useState('');
  async function getHasVidi(neve) {
    try {
      const response = await fetch(`https://localhost:44316/api/Videokartya/0?name=${neve}`);
      const data = await response.json();
      setHasVid(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (hasVid && hasVid !== '') {
      vidiSz(hasVid);
    }
  }, [hasVid]);
  function vidiSz(hasV) {
    const vidkraSzurt = szurtApp.filter(x => 
      melyikVideokartyaJobb(hasV, x)
    );
    setSzurtApp(vidkraSzurt);
  }
  function vidkSzures() {
    if (feltetel.keresesiAdatok.videokartya !== '-') {
      getHasVidi(feltetel.keresesiAdatok.videokartya);
    }
  }
  function melyikVideokartyaJobb(alap, hasonlitott) {
    if (alap.vram <= hasonlitott.VideokartyaVram) {
      return true;
    } else if (alap.vram > hasonlitott.VideokartyaVram) {
      return false;
    }
  }

  const [hasonlitott, setHasonlitott] = useState('');
  async function getHasProci(neve) {
    try {
      const response = await fetch(`https://localhost:44316/api/Processzor/0?name=${neve}`);
      const data = await response.json();
      setHasonlitott(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (hasonlitott) {
      prociSz(hasonlitott);
    }
  }, [hasonlitott]);
  function prociSzures() {
    if (feltetel.keresesiAdatok.processzor != '-') {
      getHasProci(feltetel.keresesiAdatok.processzor);
    }
  }
  function prociSz(hason) {
    const prociraSzurt = szurtApp.filter(x => 
      melyikProcesszorJobb(hason, x)
    );
    setSzurtApp(prociraSzurt);
  }
  function melyikProcesszorJobb(alap, hasonlitott) {
    if (alap.ProcesszormagokSzama < hasonlitott.ProcesszorMagokSzama) {
      return false;
    } else if (alap.ProcesszormagokSzama
      >= hasonlitott.ProcesszorMagokSzama) {
      return true;
    }
  }

  function opSzures() {
    if(feltetel.keresesiAdatok.opRendszer != '-'){
      var opraSzurt = szurtApp.filter(x =>  {
        let aktu = setup.filter(s => s.ApplikacioNeve == x.Nev);

        console.log('AKTU:')
        console.log(aktu)
      });
      setSzurtApp(opraSzurt);
    }//== feltetel.keresesiAdatok.opRendszer
    //console.log(x)
  }

  function ramSzures() {
    if(feltetel.keresesiAdatok.ram != ''){
      var ramraSzurt = szurtApp.filter(x => x.RamMeret <= feltetel.keresesiAdatok.ram);
      setSzurtApp(ramraSzurt);
    }
  }

  function tarSzures() {
    if(feltetel.keresesiAdatok.tarhely != ''){
      var tarraSzurt = szurtApp.filter(x => x.Tarhely <= feltetel.keresesiAdatok.tarhely);
      setSzurtApp(tarraSzurt);
    }
  }

  const [szurtAlap, setSzurtAlap] = useState(false);

  function szur() {
    setSzurtApp(mindenApp);
    setSzurtAlap(true);
  }
  useEffect(() => {
    if (szurtAlap) {
      nevSzures();
      kategoriaSzures();
      vidkSzures();
      prociSzures();
      opSzures();
      ramSzures();
      tarSzures();
      setSzurtAlap(false);
    }
  }, [szurtApp, szurtAlap]);

return (
    <div className="kartyak">
      {betoltA ? console.log('Betöltés folyamatban !') : mindenElemBetoltese()}    
    </div>
  );
}

export default AppLista;

//<h5 className="katNeve">{szurtApp[i].KategoriaNev}</h5>