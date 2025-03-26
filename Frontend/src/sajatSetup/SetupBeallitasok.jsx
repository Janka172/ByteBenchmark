import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stilus from './SajatBeallitasok.css';

function SetupBeallitasok() {
    const [sajatSetup, setSajatSetup] = useState([]);
    const [betoltSS, setBetoltSS] = useState(true);
    const [Mind, setMind] = useState([]);
    const [ReszletSzoveg, setReszletSzoveg] = useState([]);
    const [ModSzoveg, setModSzoveg] = useState([]);
    const [Viszonyitottak, setViszonyitottak] = useState([]);

    const [tablazatDisp, setTablazatDisp] = useState('grid');
    const [reszletDisp, setReszletDisp] = useState('none');
    const [modDisp, setModDisp] = useState('none');

    const [aktuSetup, setAktuSetup] = useState();
    const [aktuVideokartya, setAktuVideokartya] = useState();
    const [aktuProcesszor, setAktuProcesszor] = useState();
    const [aktuOpRendszer, setAktuOpRendszer] = useState();
    const [aktuRam, setAktuRam] = useState();
    const [aktuAlaplap, setAktuAlaplap] = useState();

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

    async function getMindenAlaplap() {
        try {
            const response = await fetch(`https://localhost:44316/api/Alaplap`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    
    async function getMindenProcesszor() {
        try {
          const response = await fetch(`https://localhost:44316/api/Processzor`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
        }
    }
    
    async function getMindenVideokartya() {
        try {
          const response = await fetch(`https://localhost:44316/api/Videokartya`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
        }
    }
    
    async function getMindenRam() {
        try {
            const response = await fetch(`https://localhost:44316/api/Ram`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    
    async function getMindenOpRendszer() {
        try {
            const response = await fetch(`https://localhost:44316/api/Oprendszer`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(!betoltSS) tablazatBetoltese(sajatSetup);
    }, [sajatSetup]);

    function alaphelyzetbe(){
        if(modDisp != 'none'){
            document.getElementById('alaplapCombo').value = '-';
            document.getElementById('prociCombo').value = '-';
            document.getElementById('vidkCombo').value = '-';
            document.getElementById('ramCombo').value = '-';
            document.getElementById('oprCombo').value = '-';
        }

        document.getElementById('setMentes').style.backgroundColor='';
        document.getElementById('setMentes').style.cursor='';

        setTablazatDisp('grid');
        setReszletDisp('none');
        setModDisp('none');
    }

    function tablazatBetoltese(megjelitendo){
        let ujMind=[];
        for(let elem of megjelitendo){
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
//itt
    function kereses(){
        let keresett = document.getElementById('keresesiAdat').value;
        if(keresett != ''){
            let ujMind=[];
            for(let elem of sajatSetup){
                if(elem.Gepigeny.split('.')[1].includes(keresett)){
                    ujMind.push(
                        <div className='setupTR' key={elem.Gepigeny}>
                            <div className='setupTD'>{elem.Gepigeny.split('.')[1]}</div>
                            <div className='setupTD gombTD' onClick={() => reszletekMegjelenitese(elem.Gepigeny.split('.')[1])}>Részletek Megjelenítése</div>
                            <div className='setupTD gombTD' onClick={() => modositasMegjelenitese(elem.Gepigeny.split('.')[1])}>Módosítás</div>
                        </div>
                    )
                }
            }
            setMind(ujMind);
        }
        else tablazatBetoltese(sajatSetup);
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
        

        await setReszletSzoveg(ujReszletSzoveg);
    }

    //Setup módosítása   
    async function modositasMegjelenitese(setupNeve){
        setTablazatDisp('none');
        setModDisp('grid');
        let kivalasztottSetup = await sajatSetup.find(x => setupNeve==x.Gepigeny.split('.')[1]);
        await setAktuSetup(kivalasztottSetup);
        let alaplapok = await getMindenAlaplap();
        let kivAlaplap = await getAlaplap(kivalasztottSetup.AlaplapNeve);
        let ujModSzoveg = [];
        ujModSzoveg.push(
            <div className='modSor' key={`AmodSor-${setupNeve}`}>
                <div key={`AmodSorCim-${setupNeve}`}>Alaplap:</div>
                <select id='alaplapCombo' className='combo' onChange={valtozoAlaplap} key={`AmodCombo-${setupNeve}`}>
                    <option value='-' key='A-'>-</option>
                    { alaplapok.map(x => {
                        if(x.Nev!=kivalasztottSetup.AlaplapNeve) return <option value={x.Nev} key={x.Nev}>{x.Nev}</option>
                    })}
                </select>
            </div>
        )
        setModSzoveg(ujModSzoveg);

        await viszonyitottAlkatreszekMegjelenitese(kivalasztottSetup, kivAlaplap);
    }

    async function valtozoAlaplap(e) {
        let aktuNev = e.target.value;
        let adatok = await getMindenAlaplap();
    
        if (aktuNev != '-') {
            let valasztottAlaplap = adatok.find(x => x.Nev == aktuNev);
            if (!valasztottAlaplap) valasztottAlaplap = '-';
            setAktuAlaplap(valasztottAlaplap);
        }
        else {
            let comoAdatok = document.getElementById("alaplapCombo");
            let options = comoAdatok.options;
            let ertekek = [];
            let kivSetAlap = null;

            for (let i = 0; i < options.length; i++) {
                if(options[i].value != '-') ertekek.push(options[i].value);
            }            

            for(let elem of adatok){
                if(!ertekek.includes(adatok.Nev)) kivSetAlap = elem;
            }
            await setAktuAlaplap(kivSetAlap);

            document.getElementById('setMentes').style.backgroundColor='';
            document.getElementById('setMentes').style.cursor='';
        }
    }

    async function valtozoProc(e) {
        let aktuNev = e.target.value;
        let adatok = await getMindenProcesszor();

        if (aktuNev != '-') {
            let valasztottProcesszor=adatok.find(x => x.Nev == aktuNev);
            if(!valasztottProcesszor) valasztottProcesszor = '-';
            setAktuProcesszor(valasztottProcesszor);
        }
        
    }

    async function valtozoVidk (e) {
        let aktuNev = e.target.value;
        let adatok = await getMindenVideokartya();

        if (aktuNev != '-') {
            let valasztottVideokartya = adatok.find(x => x.Nev == aktuNev);
            if(!valasztottVideokartya) valasztottVideokartya = '-';
            setAktuVideokartya(valasztottVideokartya);
        }
    }

    async function valtozoRam (e) {
        let aktuNev = e.target.value;
        let adatok = await getMindenRam();

        if (aktuNev != '-') {
            let valasztottRam = adatok.find(x => x.Nev == aktuNev);
            if(!valasztottRam) valasztottRam = '-';
            setAktuRam(valasztottRam);
        }
    }

    async function valtozoOpRend (e) {
        let aktuNev = e.target.value;
        let adatok = await getMindenOpRendszer();

        if (aktuNev != '-') {
            let valasztottOpRendszer = adatok.find(x => x.Nev == aktuNev);
            if(!valasztottOpRendszer) valasztottOpRendszer = '-';
            setAktuOpRendszer(valasztottOpRendszer);
        }
    }
 
    async function viszonyitottAlkatreszekMegjelenitese(kivalasztottSetup, kivAlaplap){
        let setupNeve = kivalasztottSetup.Gepigeny.split('.')[1];
        await setAktuSetup(kivalasztottSetup);
        let ujViszonyitottak = [];

        let procik = await getMindenProcesszor();
        let szurtProci = await procik.filter(x => kivAlaplap.CpuFoglalat.includes(x.AlaplapFoglalat));
        ujViszonyitottak.push(
            <div className='modSor' key={`PmodSor-${setupNeve}`}>
                <div key={`PmodSorCim-${setupNeve}`}>Processzor:</div>
                <select id='prociCombo' className='combo' onChange={valtozoProc} key={`PmodCombo-${setupNeve}`}>
                    <option value='-' key='P-'>-</option>
                    { szurtProci.map(x => {
                        if(x.Nev!=kivalasztottSetup.ProcesszorNev) return <option value={x.Nev} key={x.Nev}>{x.Nev}</option>
                    })}
                </select>
            </div>
        )

        let vidiKartyak = await getMindenVideokartya();
        let szurtVidiKartyak = await vidiKartyak.filter(x => kivAlaplap.VideokartyaCsatlakozo == x.alaplapiCsatlakozas)
        ujViszonyitottak.push(
            <div className='modSor' key={`VmodSor-${setupNeve}`}>
                <div key={`VmodSorCim-${setupNeve}`}>Videókártya:</div>
                <select id='vidkCombo' className='combo' onChange={valtozoVidk} key={`VmodCombo-${setupNeve}`}>
                    <option value='-' key='V-'>-</option>
                    { szurtVidiKartyak.map((x, index) => {
                        if(x.Nev!=kivalasztottSetup.VidekortyaNev) return <option value={`${x.Nev}-${x.vram}`} key={`${x.Nev}-${index}`}>{x.Nev} - {x.vram}GB</option>
                    })}
                </select>
            </div>
        )

        let ramok = await getMindenRam();
        let szurtRam = ramok.filter(x => x.MemoriaTipus.includes(kivAlaplap.MemoriaTipusa))
        ujViszonyitottak.push(
            <div className='modSor' key={`RmodSor-${setupNeve}`}>
                <div key={`RmodSorCim-${setupNeve}`}>Ram:</div>
                <select id='ramCombo' className='combo' onChange={valtozoRam} key={`RmodCombo-${setupNeve}`}>
                    <option value='-' key='R-'>-</option>
                    { szurtRam.map((x, index) => {
                        if(x.Nev!=kivalasztottSetup.RamNeve) return <option value={`${x.Nev}-${x.Frekvencia}`} key={`${x.Nev}-${index}`}>{x.Nev} - {x.Frekvencia}Hz - {x.Meret}GB</option>
                    })}
                </select>
            </div>
        )

        let oprk = await getMindenOpRendszer();
        ujViszonyitottak.push(
            <div className='modSor' key={`OmodSor-${setupNeve}`}>
                <div key={`OmodSorCim-${setupNeve}`}>Operációsrendszer:</div>
                <select id='oprCombo' className='combo' onChange={valtozoOpRend} key={`OmodCombo-${setupNeve}`}>
                    <option value='-' key='O-'>-</option>
                    { oprk.map(x => {
                        if(x.Nev!=kivalasztottSetup.OprendszerNev) return <option value={x.Nev} key={x.Nev}>{x.Nev}</option>
                    })}
                </select>
            </div>
        )

        setViszonyitottak(ujViszonyitottak);
    }
    useEffect(() => {
        if (aktuAlaplap && aktuAlaplap.Nev != aktuSetup.AlaplapNeve) {
            viszonyitottAlkatreszekMegjelenitese(aktuSetup, aktuAlaplap);
            document.getElementById('setMentes').style.backgroundColor = 'gray';
            document.getElementById('setMentes').style.cursor = 'not-allowed';
        }
        if (modDisp!='none' && document.getElementById('alaplapCombo').value == '-') {
            document.getElementById('setMentes').style.backgroundColor = '';
            document.getElementById('setMentes').style.cursor = '';
        }
    }, [aktuAlaplap]);
    
    useEffect(() => {
        try{
            if(document.getElementById('alaplapCombo').value != '-' && document.getElementById('prociCombo').value != '-' && document.getElementById('vidkCombo').value != '-' && document.getElementById('ramCombo').value != '-' && document.getElementById('oprCombo').value != '-'){
                document.getElementById('setMentes').style.backgroundColor='';
                document.getElementById('setMentes').style.cursor='';
            }
        }
        catch{}
    }, [ aktuProcesszor, aktuVideokartya, aktuRam, aktuOpRendszer ]);

    async function modositottAdatokRogzitese(setupAzon) {
        //Alaplap adat
        let alaplatAdat = document.getElementById('alaplapCombo').value;
        if(alaplatAdat == '-') alaplatAdat = null;

        //Processzor adat
        let prociAdat = document.getElementById('prociCombo').value;
        if(prociAdat == '-') prociAdat = null;

        //Videókártya adat
        let vidkAdat = document.getElementById('vidkCombo').value;
        let vidkNev = null;
        let vidkVram = null;
        if(vidkAdat != '-'){
            vidkNev = vidkAdat.split('-')[0];
            vidkVram = vidkAdat.split('-')[1];
        }

        //Ram adat
        let ramAdat = document.getElementById('ramCombo').value;
        let ramNev = null;
        let ramFrekvi =  null;
        if(ramAdat != '-'){
            ramNev = ramAdat.split('-')[0];
            ramFrekvi = ramAdat.split('-')[1];
        }

        //Operációs rendesz adat
        let oprAdat = document.getElementById('oprCombo').value;
        if(oprAdat == '-') oprAdat = null;

        const response = await fetch(`https://localhost:44316/api/Setup/0?applikacionev=sajat&igeny=${setupAzon}
        `, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "VidekortyaNev": vidkNev,
                "Vram": vidkVram,
                "ProcesszorNev": prociAdat,
                "OprendszerNev": oprAdat,
                "RamNeve": ramNev,
                "RamFrekvencia": ramFrekvi,
                "AlaplapNeve": alaplatAdat
            })
        });
        
        alaphelyzetbe();
        window.location.reload();
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

  return (
    <div>
        <div className='profilEsCim'>
          <p className='jelszoModCim'>Saját Setup Beállítások</p>
          <img src={profilUrl} className='profilkepBeall' />
        </div>
        <div className='setupTablazat' style={{ display: tablazatDisp }}>
            <div className='seetupTH' key='kereso'>
                <input type='text' id='keresesiAdat'></input>
                <div className='keresoGomb' onClick={kereses}>Keresés</div>
            </div>
            {Mind}
        </div>
        <div className='setupReszletek' style={{ display: reszletDisp }}>
            <div className='setVissza' onClick={alaphelyzetbe}>Vissza</div>
            {ReszletSzoveg}
        </div>
        <div className='setupModositas' style={{display: modDisp}}>
            <div className='setVissza' onClick={alaphelyzetbe}>Vissza</div>
            <div className='modRacs'>
                {ModSzoveg}
                {Viszonyitottak}
            </div>
            <div className='setVissza' id='setMentes' onClick={() => modositottAdatokRogzitese(aktuSetup.Gepigeny)}>Mentés</div>
        </div>
    </div>
  );
}

export default SetupBeallitasok;
