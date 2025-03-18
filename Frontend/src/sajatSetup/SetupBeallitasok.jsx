import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stilus from './SajatBeallitasok.css';

function SetupBeallitasok() {
    const [sajatSetup, setSajatSetup] = useState([]);
    const [betoltSS, setBetoltSS] = useState(true);
    const [Mind, setMind] = useState([]);
    const [ReszletSzoveg, setReszletSzoveg] = useState([]);
    const [ModSzoveg, setModSzoveg] = useState([]);

    const [tablazatDisp, setTablazatDisp] = useState('grid');
    const [reszletDisp, setReszletDisp] = useState('none');
    const [modDisp, setModDisp] = useState('none');

    const [profilUrl, setProfilUrl] = useState('');
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja == '') setProfilUrl(`/IMAGE/profil.hiany.jpg`);
        else setProfilUrl(`/IMAGE/${JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja}`);
    },[]);

    async function getSajatSetup() {
      try{
        const response = await fetch(`https://localhost:44316/api/Setup`);
        const data = await response.json();
        if(data.filter(x => x.Gepigeny.split('.')[0]==JSON.parse(localStorage.getItem('loggedInUser')).Id) != sajatSetup) {
            await setSajatSetup(data.filter(x => x.Gepigeny.split('.')[0]==JSON.parse(localStorage.getItem('loggedInUser')).Id));
        }
        setBetoltSS(false);
        return data.filter(x => x.Gepigeny.split('.')[0]==JSON.parse(localStorage.getItem('loggedInUser')).Id);
      } catch (error){
        console.error(error);
      }
    }
    useEffect(() => { getSajatSetup() }, []);

    useEffect(() => {
        if(!betoltSS) tablazatBetoltese();
    }, [sajatSetup]);

    function alaphelyzetbe(){
        setTablazatDisp('grid');
        setReszletDisp('none');
        setModDisp('none');
    }

    function tablazatBetoltese(){
        let ujMind=[];

        for(let elem of sajatSetup){
            ujMind.push(
                <div className='setupTR' key={elem.Gepigeny}>
                    <div className='setupTD'>{elem.Gepigeny.split('.')[1]}</div>
                    <div className='setupTD gombTD' onClick={() => reszletekMegjelenitese(elem.Gepigeny.split('.')[1])}>Részletek Megjelenítése</div>
                    <div className='setupTD gombTD' onClick={() => modositasMegjelenitese(elem.Gepigeny.split('.')[1])}>Módosítás</div>
                </div>
            )
        }
        setMind(ujMind);
    }

    async function reszletekMegjelenitese(setupNeve){
        setTablazatDisp('none');
        setReszletDisp('grid');

        let kivalasztottSetup = sajatSetup.find(x => setupNeve==x.Gepigeny.split('.')[1])
        let ujReszletSzoveg = [];
        ujReszletSzoveg.push(
            <div className='reszletRacs' key={`reszletRacs-${kivalasztottSetup.AlaplapNeve}`}>
                <div className='reszletSor' key={`aS-${kivalasztottSetup.AlaplapNeve}`}>
                    <div key={`aC-${kivalasztottSetup.AlaplapNeve}`}>Alaplap:</div>
                    <div key={`aSz-${kivalasztottSetup.AlaplapNeve}`}>{kivalasztottSetup.AlaplapNeve}</div>
                    <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'a', 'id': await getAlaplap(kivalasztottSetup.AlaplapNeve)}}>
                        <button className='tovabiReszletekGomb'>További részletek</button>
                    </Link>
                </div>
        
                <div className='reszletSor' key={`pS-${kivalasztottSetup.ProcesszorNev}`}>
                    <div key={`pC-${kivalasztottSetup.ProcesszorNev}`}>Processzor:</div>
                    <div key={`pSz-${kivalasztottSetup.ProcesszorNev}`}>{kivalasztottSetup.ProcesszorNev}</div>
                    <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'p', 'id': await getProcesszor(kivalasztottSetup.ProcesszorNev)}}>
                        <button className='tovabiReszletekGomb'>További részletek</button>
                    </Link>
                </div>
        
                <div className='reszletSor' key={`vS-${kivalasztottSetup.VidekortyaNev}`}>
                    <div key={`vC-${kivalasztottSetup.VidekortyaNev}`}>Videókártya:</div>
                    <div key={`vSz-${kivalasztottSetup.VidekortyaNev}`}>{kivalasztottSetup.VidekortyaNev} - {kivalasztottSetup.VideokartyaVram}GB</div>
                    <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'v', 'id': await getVideokartya(kivalasztottSetup.VidekortyaNev, kivalasztottSetup.VideokartyaVram)}}>
                        <button className='tovabiReszletekGomb'>További részletek</button>
                    </Link>
                </div>
        
                <div className='reszletSor' key={`rS-${kivalasztottSetup.RamNeve}`}>
                    <div key={`rC-${kivalasztottSetup.RamNeve}`}>Ram:</div>
                    <div key={`rSz-${kivalasztottSetup.RamNeve}`}>{kivalasztottSetup.RamNeve} - {kivalasztottSetup.RamFrekvencia}Hz</div>
                    <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'r', 'id': await getRam(kivalasztottSetup.RamNeve, kivalasztottSetup.RamFrekvencia, kivalasztottSetup.RamMeret)}}>
                        <button className='tovabiReszletekGomb'>További részletek</button>
                    </Link>
                </div>
        
                <div className='reszletSor' key={`oS-${kivalasztottSetup.OprendszerNev}`}>
                    <div key={`oC-${kivalasztottSetup.OprendszerNev}`}>Operációsrendszer:</div>
                    <div key={`oSz-${kivalasztottSetup.OprendszerNev}`}>{kivalasztottSetup.OprendszerNev}</div>
                    <Link to='/oldalak/AlkatreszReszletek' state={{'tipus':'r', 'id': await getOpRendszer(kivalasztottSetup.OprendszerNev)}}>
                        <button className='tovabiReszletekGomb'>További részletek</button>
                    </Link>
                </div>
            </div>
        );
        

        setReszletSzoveg(ujReszletSzoveg);
    }

    async function modositasMegjelenitese(setupNeve){
        setTablazatDisp('none');
        setModDisp('grid');
console.log(setupNeve)
        let kivalasztottSetup = sajatSetup.find(x => setupNeve==x.Gepigeny.split('.')[1]);
        let alaplapok = await getMindenAlaplap();
        let ujModSzoveg = [];
        ujModSzoveg.push(
            <div className='modSor' key={`AmodSor-${setupNeve}`}>
                <div key={`AmodSorCim-${setupNeve}`}>Alaplap</div>
                <select id='alaplapCombo' className='combo' onChange={valtozoAlaplap} key={`AmodCombo-${setupNeve}`}>
                    <option value='-' key='-'>-</option>
                    { alaplapok.map(x => {
                        if(x.Nev!=kivalasztottSetup.AlaplapNeve) return <option value={x.Nev} key={x.Nev}>{x.Nev}</option>
                    })}
                </select>
            </div>
        )
        setModSzoveg(ujModSzoveg);

        viszonyitottAlkatreszekMegjelenitese(kivalasztottSetup);
    }
 
    async function viszonyitottAlkatreszekMegjelenitese(kivalasztottSetup){
        console.log(kivalasztottSetup)
        let procik = await getMindenProcesszor();
    }

    //Comboboxok léptetése
    //const [aktuVideokartya, setAktuVideokartya] = useState(mindenVideokartya[0]);
    //const [aktuProcesszor, setAktuProcesszor] = useState(mindenProcesszor[0]);
    //const [aktuOpRendszer, setAktuOpRendszer] = useState(mindenOpRendszer[0]);
    //const [aktuRam, setAktuRam] = useState(mindenRam[0]);
    const [aktuAlaplap, setAktuAlaplap] = useState();
    /*
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
*/
    async function valtozoAlaplap(e){
        const aktuNev = e.target.value;
        let adatok = await getMindenAlaplap();
        let valasztottAlaplap = adatok.find(x => x.Nev == aktuNev);
        if(!valasztottAlaplap) valasztottAlaplap='-';
        setAktuAlaplap(valasztottAlaplap);
    };

    
    //Kiválasztott adatok lekérése
    async function getAlaplap(kivAlaplapNeve) {
        try {
            const response = await fetch(`https://localhost:44316/api/Alaplap/0?name=${kivAlaplapNeve}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getProcesszor(kivProci) {
        try {
          const response = await fetch(`https://localhost:44316/api/Processzor/0?name=${kivProci}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
        }
    }

    async function getVideokartya(kivVidkNev, kivVidkVram) {
        try {
          const response = await fetch(`https://localhost:44316/api/Videokartya/0?name=${kivVidkNev}&vram=${kivVidkVram}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
        }
    }

    async function getRam(kivRamNeve, kivRamFreki, kivRamMeret) {
        try {
            const response = await fetch(`https://localhost:44316/api/Ram/0?name=${kivRamNeve}&frekvencia=${kivRamFreki}&meret=${kivRamMeret}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
        
    async function getOpRendszer(kivOpNeve) {
        try {
            const response = await fetch(`https://localhost:44316/api/Oprendszer/0?name=${kivOpNeve}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    //Minden adat lekérése
    async function getMindenAlaplap() {
        try {
            const response = await fetch(`https://localhost:44316/api/Alaplap`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getMindenProcesszor(kivProci) {
        try {
          const response = await fetch(`https://localhost:44316/api/Processzor`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
        }
    }

  return (
    <div>
        <div className='profilEsCim'>
          <p className='jelszoModCim'>Saját Setup Beállítások</p>
          <img src={profilUrl} className='profilkepBeall' />
        </div>
        <div className='setupTablazat' style={{ display: tablazatDisp }}>
            {Mind}
        </div>
        <div className='setupReszletek' style={{ display: reszletDisp }}>
            <div className='setVissza' onClick={alaphelyzetbe}>Vissza</div>
            {ReszletSzoveg}
        </div>
        <div className='setupModositas' style={{display: modDisp}}>
            <div className='setVissza' onClick={alaphelyzetbe}>Vissza</div>
            <div className='modRacs'>{ModSzoveg}</div>
            <div className='setVissza'>Mentés</div>
        </div>
    </div>
  );
}

export default SetupBeallitasok;
