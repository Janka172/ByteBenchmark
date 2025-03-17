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

  var [vanProci, setVanProci] = useState('none');
  var [vanRam, setVanRam] = useState('none');
  var [nevDisp, setNevDisp] = useState('none');

  const [kivVideokartya, setKivalasztottVideokartya] = useState('nincs');
  const [kivProcesszor, setKivalasztottProcesszor] = useState('nincs');
  const [kivOpRendszer, setKivalasztottOpRendszer] = useState('nincs');
  const [kivRam, setKivalasztottRam] = useState('nincs');
  const [kivAlaplap, setKivalasztottAlaplap] = useState('nincs');
  
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

  // Minden adat betöltődött
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
  }
  useEffect(() => {
    if (!betoltV && !betoltP && !betoltO && !betoltR && !betoltA) {
      mindenBetolotott();
    }
  }, [betoltV, betoltP, betoltO, betoltR, betoltA]);

  //Comboboxok léptetése
  const valtozoVidk = (e) => {
    const aktuNev = e.target.value;
    const valasztottVideokartya = mindenVideokartya.find(x => x.Nev == aktuNev);
    setAktuVideokartya(valasztottVideokartya);
  };

  const valtozoProc = (e) => {
    const aktuNev = e.target.value;
    const valasztottProcesszor=mindenProcesszor.find(x => x.Nev == aktuNev);
    setAktuProcesszor(valasztottProcesszor);
  };

  const valtozoOpRend = (e) => {
    const aktuNev = e.target.value;
    const valasztottOpRendszer=mindenOpRendszer.find(x => x.Nev == aktuNev);
    setAktuOpRendszer(valasztottOpRendszer);
  };

  const valtozoRam = (e) => {
    const aktuNev = e.target.value;
    const valasztottRam=mindenRam.find(x => x.Nev == aktuNev);
    setAktuRam(valasztottRam);
  };

  const valtozoAlaplap = (e) => {
    const aktuNev = e.target.value;
    const valasztottAlaplap=mindenAlaplap.find(x => x.Nev == aktuNev);
    setAktuAlaplap(valasztottAlaplap);
  };

  //Hozzáadás rögzítése
  function kivalasztVidk(){
    setKivalasztottVideokartya(aktuVideokartya);
  };

  function kivalasztProc(){
    if(mindenProcesszor.filter(x => kivAlaplap.CpuFoglalat.includes(x.AlaplapFoglalat)) == 0) setKivalasztottProcesszor('nincs');
    else setKivalasztottProcesszor(aktuProcesszor);
  }

  function kivalasztOpRend(){
    setKivalasztottOpRendszer(aktuOpRendszer);
  }

  function kivalasztRam(){
    if(mindenRam.filter(x => x.MemoriaTipus.includes(kivAlaplap.MemoriaTipusa)).length == 0) setKivalasztottRam('nincs');
    else setKivalasztottRam(aktuRam);
  }

  function kivalasztAlaplap(){
    setKivalasztottAlaplap(aktuAlaplap);
    if(kivVideokartya!='nincs' || kivProcesszor!='nincs' || kivOpRendszer!='nincs' || kivRam!='nincs'){
      setKivalasztottOpRendszer('nincs');
      setKivalasztottProcesszor('nincs');
      setKivalasztottRam('nincs');
      setKivalasztottVideokartya('nincs');
    }
    setVanAlap('grid');
  }

  const gorgetoContainer = useRef(null);
  function gorgetoLeft() {
    gorgetoContainer.current.scrollBy({
        top: 0,
        left: -300,
    });
  };
  function gorgetoRight() {
    gorgetoContainer.current.scrollBy({
        top: 0,
        left: 300,
    });
  };

  //Combo elemek megjelnítése
  const [vanAlap, setVanAlap] = useState('none');
  
  // Operációs rendszerek
  function opRendszerBetoltes(){
    var elemek = [];
    elemek.push(
      mindenOpRendszer.map((op, index) => (
        <option value={op.Nev} key={index}>{op.Nev}</option> 
      ))
    )
    return elemek;
  }

  //Videókártyák
  function videokartyaBetoltes(){
    var elemek = [];
    elemek.push(
      mindenVideokartya.map((vid, index) => (
        <option value={vid.Nev} key={index}>{vid.Nev} - {vid.vram}GB</option>
    )))
    return elemek;
  }

  //Processzorok
  function processzorBetoltes(){
    var elemek = [];
    if(kivAlaplap!='nincs'){
      var szurtProci=mindenProcesszor.filter(x => kivAlaplap.CpuFoglalat.includes(x.AlaplapFoglalat));
      if(szurtProci.length == 0) vanProci='none';
      else vanProci='flex';
      elemek.push(
        szurtProci.map((proc, index) => (
          <option value={proc.Nev} key={index}>{proc.Nev}</option> 
      )))
    }
    return elemek;
  }

  //Ramok
  function ramBetoltes(){
    var elemek = [];
    if(kivAlaplap!='nincs'){
      var szurtRam=mindenRam.filter(x => x.MemoriaTipus.includes(kivAlaplap.MemoriaTipusa))
      if(szurtRam.length == 0) vanRam='none';
      else vanRam='flex';
      elemek.push(
        szurtRam.map((ram, index) => (
          <option value={ram.Nev} key={index}>{ram.Nev} - {ram.Frekvencia}Hz</option> 
        )))
    }
    return elemek;
  }

  //Alaplapok
  function alaplapBetoltes(){
    var elemek = [];
    elemek.push(
      mindenAlaplap.map((alap, index) => (
        <option value={alap.Nev} key={index}>{alap.Nev}</option>
    )))
    return elemek;
  }


  //Futtatható alkalmazások
  const [mindenApp, setMindenApp] = useState([]);
  const [szurtApp, setSzurtApp] = useState([]);
  const [betoltApp, setBetoltApp] = useState(true);
  const [setup, setSetup] = useState([]);
  const [betoltS, setBetoltS] = useState(true);

  async function getMindenApp() {
    try {
      const response = await fetch('https://localhost:44316/api/Applikacio');
      const data = await response.json();
      setMindenApp(data.filter(x=>x.Nev!='sajat'));
      setSzurtApp(data.filter(x=>x.Nev!='sajat'));
      setBetoltApp(false);
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

  function MinSetupKereso(setup, Nev){
    let aktu = setup.filter(s => s.ApplikacioNeve == Nev);
    if(aktu.length > 1) {
      return aktu.filter(e => e.Gepigeny == 'min')[0];
    }
    return aktu[0];
  }

  useEffect(() => {
    if (kivVideokartya=='nincs' || kivProcesszor=='nincs' || kivOpRendszer=='nincs' || kivRam=='nincs' || kivAlaplap=='nincs'){
      document.getElementById('futAlkGomb').style.backgroundColor='gray';
      document.getElementById('futAlkGomb').style.cursor='not-allowed';

      document.getElementById('mentAlkGomb').style.backgroundColor='gray';
      document.getElementById('mentAlkGomb').style.cursor='not-allowed';
    }
    else{
      document.getElementById('futAlkGomb').style.backgroundColor='';
      document.getElementById('futAlkGomb').style.cursor='';

      document.getElementById('mentAlkGomb').style.backgroundColor='';
      document.getElementById('mentAlkGomb').style.cursor='';
    }
  }, [kivVideokartya, kivProcesszor, kivOpRendszer, kivRam, kivAlaplap])

  const [Mind, setMind] = useState([]);
  const [ottVanVagyNem, setOttVanVagyNem] = useState('none');

  useEffect(() => {
    listazas();
  }, [szurtApp]);

  function listazas() {
    if (!betoltApp && kivVideokartya != 'nincs' && kivProcesszor != 'nincs' && kivOpRendszer != 'nincs' && kivRam != 'nincs' && kivAlaplap != 'nincs') {
      setOttVanVagyNem('block');
      var ujMind=[]
      if(szurtApp.length!=0){
        ujMind = szurtApp.map((app, i) => {
          let kepUrl = `/IMAGE/logo.${app.KepeleresiUtja}`;
          if(app.KepeleresiUtja == '') kepUrl = `/IMAGE/logo.hiany.jpg`;
          const adat = { nev: app.Nev };
          return (
            <div className="korKepKeret" key={i}>
              <img src={kepUrl} className="korKepS" alt="App kép" />
              <h4 className="appNeve">{app.Nev}</h4>
              <Link to='/oldalak/AlkalmazasReszletek' state={adat}>
                <button className='reszletGomb'>További részletek</button>
              </Link>
            </div>
          );
        });
      }
      else{
        ujMind = <div className='hianyUzi'>Jelenleg nincsen a feltételeknek megfeleő alkalmazás !</div>
      }

      setMind(ujMind);
    } else {
      setOttVanVagyNem('none');
    }
  }

  async function szur() {
    if (!betoltApp && kivVideokartya !== 'nincs' && kivProcesszor !== 'nincs' && kivOpRendszer !== 'nincs' && kivRam !== 'nincs' && kivAlaplap !== 'nincs') {
      console.log('Szűrés elkezdődött');
  
      let szurtLista = [...mindenApp];
  
      // Szűrés operációsrendszer szerint
      szurtLista = szurtLista.filter(x => {
        const minSetup = MinSetupKereso(setup, x.Nev);
        return minSetup && minSetup.OprendszerNev === kivOpRendszer.Nev;
      });
  
      // Szűrés videókártya szerint
      try {
        const response = await fetch(`https://localhost:44316/api/Videokartya/0?name=${kivVideokartya.Nev}&vram=${kivVideokartya.vram}`);
        const hasVid = await response.json();
        szurtLista = szurtLista.filter(x => melyikVideokartyaJobb(hasVid, MinSetupKereso(setup, x.Nev)));
      } catch (error) {
        console.error("Videókártya lekérése sikertelen:", error);
      }

      // Szűrés processzor szerint
      try {
        const response = await fetch(`https://localhost:44316/api/Processzor/0?name=${kivProcesszor.Nev}`);
        const hasonlitott = await response.json();
        szurtLista = szurtLista.filter(x => melyikProcesszorJobb(hasonlitott, MinSetupKereso(setup, x.Nev)));
      } catch (error) {
        console.error("Processzor lekérése sikertelen:", error);
      }

      // Szűrés RAM szerint
      szurtLista = szurtLista.filter(x => {
        const minSetup = MinSetupKereso(setup, x.Nev);
        return minSetup && minSetup.RamMeret <= kivRam.Meret;
      });

      setSzurtApp(szurtLista);
    } else {
      setSzurtApp([]);
    }
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
  function melyikProcesszorJobb(alap, hasonlitott) {
    if(hasonlitott!=null){
      if (alap.ProcesszormagokSzama < hasonlitott.ProcesszorMagokSzama) {
        return false;
      } else if (alap.ProcesszormagokSzama >= hasonlitott.ProcesszorMagokSzama) {
        return true;
      }
    }
  }

  //Saját setup rögzítése
  const [sajatSetup, setSajatSetup] = useState([]);
  const [betoltSS, setBetoltSS] = useState(true);
  const [nevHiba, setNevHiba] = useState('none');

  function rogzites(){
    if (!betoltApp && kivVideokartya != 'nincs' && kivProcesszor != 'nincs' && kivOpRendszer != 'nincs' && kivRam != 'nincs' && kivAlaplap != 'nincs'){
      if(nevDisp == 'none') setNevDisp('grid');
      else setNevDisp('none');
    }
  }
  useEffect(() => {
    if (kivVideokartya != 'nincs' || kivProcesszor != 'nincs' || kivOpRendszer != 'nincs' || kivRam != 'nincs' || kivAlaplap != 'nincs'){
      setNevDisp('none');
    }
  }, [kivAlaplap])

  async function rogOk(){
    if(document.getElementById('setNev').value != ''){
      let sajatAdatok = await getSajatSetup();
      let foglalte = await mentesiNevEllenorzes(document.getElementById('setNev').value, sajatAdatok);
      if(!foglalte) setupPost(document.getElementById('setNev').value);
      else {
        document.getElementById('elnevezesiHiba').innerText='Ez a Setup név már foglalt !';
        setNevHiba('flex');
      }
    }
  }

  async function getSajatSetup() {
    try{
      const response = await fetch(`https://localhost:44316/api/Setup`);
      const data = await response.json();
      await setSajatSetup(data.filter(x => x.Gepigeny.split('.')[0]==JSON.parse(localStorage.getItem('loggedInUser')).Id));
      setBetoltSS(false);
      return data.filter(x => x.Gepigeny.split('.')[0]==JSON.parse(localStorage.getItem('loggedInUser')).Id);
    } catch (error){
      console.error(error);
    }
  }

  function mentesiNevEllenorzes(nev, sajatAdatok){
    let foglalt = false;
    for(let elem of sajatAdatok){
      if(elem.Gepigeny.split('.')[1]==nev) foglalt = true;
    }
    return foglalt;
  }

  async function setupPost(nev){
    let gp = `${JSON.parse(localStorage.getItem('loggedInUser')).Id}.${nev}`
    try {
      const response = await fetch('https://localhost:44316/api/Setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ApplikacioNeve: 'sajat',
          VidekortyaNev: kivVideokartya.Nev,
          Vram: kivVideokartya.vram,
          ProcesszorNev: kivProcesszor.Nev,
          OprendszerNev: kivOpRendszer.Nev,
          RamNeve: kivRam.Nev,
          RamFrekvencia: kivRam.Frekvencia,
          AlaplapNeve: kivAlaplap.Nev,
          Gepigeny: gp
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const data = await response.json();
      alaphelyzetbe();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function alaphelyzetbe(){
    setNevDisp('none');
    setOttVanVagyNem('none');
    setKivalasztottOpRendszer('nincs');
    setKivalasztottProcesszor('nincs');
    setKivalasztottRam('nincs');
    setKivalasztottVideokartya('nincs');
    setVanAlap('none');
    setOttVanVagyNem('none')
    setNevHiba('none');
    document.getElementById('setNev').value='';
    setAktuAlaplap(mindenAlaplap[0]);
  }

  return (
    <div className='teljesSajat' id='teljSajat'>
      <div className='kivalasztottak'>
        <h1>Kiválasztott alkatrészek</h1>

        <div className='sajSor'>
          <h2 className='soreCime'>Alaplap:</h2>
          <h2 className='soreCime'>{kivAlaplap.Nev}</h2>
        </div>

        <div className='sajSor'>
          <h2 className='soreCime'>Videókártya:</h2>
          <h2 className='soreCime'>{kivVideokartya.Nev} - {kivVideokartya.vram}GB</h2>
        </div>

        <div className='sajSor'>
          <h2 className='soreCime'>Processzor:</h2>
          <h2 className='soreCime'>{kivProcesszor.Nev}</h2>
        </div>

        <div className='sajSor'>
          <h2 className='soreCime'>Operációsrendszer:</h2>
          <h2 className='soreCime'>{kivOpRendszer.Nev}</h2>
        </div>

        <div className='sajSor'>
          <h2 className='soreCime'>Ram:</h2>
          <h2 className='soreCime'>{kivRam.Nev} - {kivRam.Frekvencia}Hz</h2>
        </div>

        <div className='sajatGombSor'>
          <button className='szur' onClick={szur} id='futAlkGomb'>Futtatható Alkalmazások Megjelenítése</button>
          <button className='szur' onClick={rogzites} id='mentAlkGomb'>Mentés</button>
        </div>

        <div className='sajatSetupElnevezes' style={{display: nevDisp}}>
          <div id='elnevezesiHiba' style={{display: nevHiba}}></div>
          <p className='setSzoveg'>Adjon nevet a setupjának !</p>
          <input type='text' id='setNev'></input>
          <div className='okGombok'>
            <button className='sajGomb' onClick={rogOk} id='mentAlkGomb'>Mentés</button>
            <button className='sajGomb' onClick={alaphelyzetbe}>Mégsem</button>
          </div>
        </div>
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
          <h2 className='soreCime'>Alaplap:</h2>
          <select className='combo' onChange={valtozoAlaplap}>
            {betoltA ? (<option>Betöltés...</option>) : alaplapBetoltes()}
          </select>
          <button className='sajGomb' onClick={kivalasztAlaplap}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'a', 'id':aktuAlaplap}}><button className='sajGomb'>További részletek</button></Link>
        </div>

        <div className='kivSor' style={{display: vanAlap}}>
          <h2 className='soreCime'>Videókártya:</h2>
          <select className='combo' onChange={valtozoVidk}>
            {betoltV ? (<option>Betöltés...</option>) : videokartyaBetoltes()}
          </select>
          <button className='sajGomb' onClick={kivalasztVidk}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'v', 'id':aktuVideokartya}}><button className='sajGomb'>További részletek</button></Link>
        </div>

        <div className='kivSor' style={{display: vanAlap}}>
          <h2 className='soreCime'>Processzor:</h2>
          <select className='combo' onChange={valtozoProc}>
            {betoltP ? (<option>Betöltés...</option>) : processzorBetoltes()}
          </select>
          <button className='sajGomb' onClick={kivalasztProc}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'p', 'id':aktuProcesszor}} style={{display: vanProci, textDecoration: 'none'}}><button className='sajGomb'>További részletek</button></Link>
        </div>

        <div className='kivSor' style={{display: vanAlap}}>
          <h2 className='soreCime'>Ram:</h2>
          <select className='combo' onChange={valtozoRam}>
            {betoltR ? (<option>Betöltés...</option>) : ramBetoltes()}
          </select>
          <button className='sajGomb' onClick={kivalasztRam}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'r', 'id':aktuRam}} style={{display: vanRam, textDecoration: 'none'}}><button className='sajGomb'>További részletek</button></Link>
        </div>

        <div className='kivSor' style={{display: vanAlap}}>
          <h2 className='soreCime'>Operációsrendszer:</h2>
          <select className='combo' onChange={valtozoOpRend}>
            {betoltO ? (<option>Betöltés...</option>) : opRendszerBetoltes()}
          </select>
          <button className='sajGomb' onClick={kivalasztOpRend}>Hozzáadás</button>
          <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'o', 'id':aktuOpRendszer}}><button className='sajGomb'>További részletek</button></Link>
        </div>

      </div>

    </div>
  );
}

export default Sajat;