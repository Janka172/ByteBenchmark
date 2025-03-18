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

        let kivalasztottSetup = sajatSetup.find(x => setupNeve==x.Gepigeny.split('.')[1]);
        let alaplapok = await getMindenAlaplap(kivalasztottSetup.AlaplapNeve);
        
        console.log(alaplapok)

        let ujModSzoveg = [];
        ujModSzoveg.push(
            <div className='modRacs'>
                <div className='modRacs'>
                    <div>Alaplap</div>
                    <select >{alaplapok.map(x => (
                        <option value={x.Nev} key={x.Nev}>{x.Nev}</option>
                    ))}</select>
                </div>

            </div>
        )
        setModSzoveg(ujModSzoveg);
    }

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
    async function getMindenAlaplap(kivAlaplapNeve) {
        try {
            const response = await fetch(`https://localhost:44316/api/Alaplap`);
            const data = await response.json();
            data.find(x => {
                if(x.Nev==kivAlaplapNeve) return x;
            }).Nev='-';
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
            {ModSzoveg}
        </div>
    </div>
  );
}

export default SetupBeallitasok;
