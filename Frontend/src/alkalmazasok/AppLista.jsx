import React, { useState, useEffect } from 'react';
import { useKeresesiAdatok } from './KeresesiAdatokContext';
import { Link } from 'react-router-dom';
import AppListaStilus from './AppLista.css';

function AppLista() {  
  const [mindenApp, setMindenApp] = useState([]);
  const [szurtApp, setSzurtApp] = useState([]);
  const [betoltA, setBetoltA] = useState(true);
  const [setup, setSetup] = useState([]);
  const [betoltS, setBetoltS] = useState(true);

  const  feltetel  = useKeresesiAdatok();
  useEffect(() => {
    setSzurtApp(mindenApp);
    szur();
  }, [mindenApp, feltetel]);

  function MinSetupKereso(setup, Nev){
    let aktu = setup.filter(s => s.ApplikacioNeve == Nev);
    if(aktu.length > 1) {
      return aktu.filter(e => e.Gepigeny == 'min')[0];
    }
    return aktu[0];
  }

  async function getMindenApp() {
    try {
      const response = await fetch('https://localhost:44316/api/Applikacio');
      const data = await response.json();
      setMindenApp(data.filter(x=>x.Nev!='sajat'));
      setSzurtApp(data.filter(x=>x.Nev!='sajat'));
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
    } catch (error){
      console.error(error);
    }
  }
  useEffect(() => { getSetup(); }, [ mindenApp ]);

  var Mind = [];
  function mindenElemBetoltese() {
    let AppIndex = szurtApp.length;
    for (let i = 0; i < AppIndex; i++) {
      let kepUrl = `/IMAGE/logo.${szurtApp[i].KepeleresiUtja}`;
      if(szurtApp[i].KepeleresiUtja == '') kepUrl = `/IMAGE/logo.hiany.jpg`;
      const adat = { nev: szurtApp[i].Nev };
      Mind.push(
        <div className="kartyaKeret" key={i}>
          <img src={kepUrl} className="kartyaLogo" />
          <h4 className="appNeve">{szurtApp[i].Nev}</h4>
          <Link to="/oldalak/AlkalmazasReszletek" state={adat}>
            <button className="reszletG">További részletek</button>
          </Link>
        </div>
      );
    }
    return Mind.map((x) => x);
  }

  //Szűrés név szerint
  function nevSzures() {
    if(feltetel.keresesiAdatok.nev != ''){
      var nevreSzurt = szurtApp.filter(x => x.Nev.toLowerCase().includes(feltetel.keresesiAdatok.nev.toLowerCase()));
      setSzurtApp(nevreSzurt);
    }
  }

  //Szűrés kategória szerint
  function kategoriaSzures() {
    if(feltetel.keresesiAdatok.kategoria != '-'){
      var katraSzurt = szurtApp.filter(x => x.KategoriaNev == feltetel.keresesiAdatok.kategoria);
      setSzurtApp(katraSzurt)
    } 
  }

  //Szűrés videókártya szerint
  const [hasVid, setHasVid] = useState('');
  async function getHasVidi(feltetel) {
    try {
      const response = await fetch(`https://localhost:44316/api/Videokartya/0?name=${feltetel.split('-')[0]}&vram=${feltetel.split('-')[1].split(' ')[1]}`);
      const data = await response.json();
      setHasVid(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (hasVid && hasVid != '') {
      vidiSz(hasVid);
    }
  }, [hasVid]);
  
  function vidkSzures() {
    if (feltetel.keresesiAdatok.videokartya != '-') {
      getHasVidi(feltetel.keresesiAdatok.videokartya);
    }
  }

  function vidiSz(hasV) {
    const vidkraSzurt = szurtApp.filter(x => melyikVideokartyaJobb(hasV, MinSetupKereso(setup, x.Nev)));
    setSzurtApp(vidkraSzurt);
  }
  function melyikVideokartyaJobb(alap, hasonlitott) {
    if(hasonlitott!=null){
      if (alap.vram >= hasonlitott.VideokartyaVram) {
        return true;
      } else {
        return false;
      }
    } 
  }
  
  //Szűrés processzor szerint
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
    if (hasonlitott && hasonlitott != '') {
      prociSz(hasonlitott);
    }
  }, [hasonlitott]);

  function prociSzures() {
    if (feltetel.keresesiAdatok.processzor != '-') {
      getHasProci(feltetel.keresesiAdatok.processzor);
    }
  }
  function prociSz(hason) {
    const prociraSzurt = szurtApp.filter(x => melyikProcesszorJobb(hason, MinSetupKereso(setup, x.Nev)));
    setSzurtApp(prociraSzurt);
  }
  function melyikProcesszorJobb(alap, hasonlitott) {
    if(hasonlitott!=null){
      if (alap.ProcesszormagokSzama < hasonlitott.ProcesszorMagokSzama) {
        return false;
      } else if (alap.ProcesszormagokSzama >= hasonlitott.ProcesszorMagokSzama) {
        return true;
      }
    }
  }

  //Szűrés ram szerint
  function ramSzures() {
    if(feltetel.keresesiAdatok.ram != ''){
      var ramraSzurt = szurtApp.filter(x => {
        if(MinSetupKereso(setup, x.Nev)!=null){
          return MinSetupKereso(setup, x.Nev).RamMeret <= feltetel.keresesiAdatok.ram;
        }
        return false;
      });
      setSzurtApp(ramraSzurt);
    }
  }
  //Szűrés tárhely igény szerint
  function tarSzures() {
    if(feltetel.keresesiAdatok.tarhely != ''){
      var tarraSzurt = szurtApp.filter(x => {
        if(MinSetupKereso(setup, x.Nev)!=null){
         return MinSetupKereso(setup, x.Nev).Tarhely <= feltetel.keresesiAdatok.tarhely;
        }
        return false;
      });
      setSzurtApp(tarraSzurt);
    }
  }

  const [szurtAlap, setSzurtAlap] = useState(false);
  function szur() {
    setSzurtAlap(true);
    setSzurtApp(mindenApp);
  }
  async function filterAlap() {
    if (szurtAlap) {
      await nevSzures();
      await kategoriaSzures();
      await vidkSzures();
      await prociSzures();
      await ramSzures();
      await tarSzures();
      setSzurtAlap(false);
    }
  };
  useEffect(() => {
    filterAlap();
  }, [szurtApp, szurtAlap]);

return (
    <div className="kartyak">
      {betoltA ? console.log() : mindenElemBetoltese()}    
    </div>
  );
}

export default AppLista;