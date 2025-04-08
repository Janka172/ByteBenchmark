import { useEffect, useState } from 'react';
import ProfilTorles from './ProfilTorlese';
import Stilus from './Felh.css';
import JelszoModosito from './JelszoModosito';

function AdminMenu() {
  const [elemek, setElemek] = useState([]);
  const [profilUrl, setProfilUrl] = useState('');
  const [kivalasz, setKivalaszt] = useState(-1);
  const [fejlec, SetFejlec] = useState('');

  const [tablDisp, setTablDisp] = useState('grid');
  const [szuroDisp, setSzuroDisp] = useState('none');
  const [reszletDisp, setReszletDisp] = useState('none');

  const [altNyitva, setAltNyitva] = useState('none');
  const [jelszoNyitva, setJelszoNyitva] = useState('none');
  const [torlesNyitva, setTorlesNyitva] = useState('none');

  async function profilokBetoltese(szurtAdat = null) {
    let Mind = [];
    let adatok = szurtAdat || JSON.parse(localStorage.getItem('users'));

    Mind.push(
      <div className='profilSor profCimsor' key="header">
        <div>Felhasználónév</div>
        <div>Jogosultság</div>
        <div></div>
      </div>
    );

    for (let elem of adatok) {
      if (elem.Felhasznalonev != JSON.parse(localStorage.getItem('loggedInUser')).Felhasznalonev) {
        Mind.push(
          <div className='profilSor' key={elem.Id}>
            <div className='profilNev' id={'F.' + elem.Id}>{elem.Felhasznalonev}</div>
            <div className='prfilJog' id={'J.' + elem.Id}>
              {elem.Jogosultsag == 0 ? 'Felhasználó' : 'Admin'}
            </div>
            <div className='profilModGomb' id={'I.' + elem.Id} onClick={() => reszletekBetoltese(elem.Id)}>Módosítás</div>
          </div>
        );
      }
    }
    setElemek(Mind);
  }
  useEffect(() => { profilokBetoltese(); }, [ tablDisp ]);

  function szuroMegnyitas() {
    if (szuroDisp == 'none') {
      setSzuroDisp('grid');
      document.getElementById('nevKereses').value='';
      document.getElementById('jogCombo').value='skip';
    } else {
      setSzuroDisp('none');
      profilokBetoltese();
    }
  }

  async function szures() {  
    let szurtAdat = JSON.parse(localStorage.getItem('users'));
  
    const nevKereses = document.getElementById('nevKereses').value.toLowerCase();
    const jogCombo = document.getElementById('jogCombo').value;
  
    szurtAdat = szurtAdat.filter(x => {
      const megfelelNev = nevKereses == '' || x.Felhasznalonev.toLowerCase().includes(nevKereses);
      const megfelelJog = jogCombo == 'skip' || x.Jogosultsag == jogCombo;
  
      return megfelelNev && megfelelJog;
    });
  
    profilokBetoltese(szurtAdat);
  }

  function visszaTablahoz(){
    setTablDisp('grid');
    setReszletDisp('none');

    document.getElementById('felnInp').value = '';
    document.getElementById('emailIn').value = '';
    document.getElementById('jogCombo').value = 'skip';

    profilokBetoltese();
  }

  function alatlanosLenyitas(){
    if(altNyitva == 'none') setAltNyitva('grid');
    else{
      setAltNyitva('none');
    }
  }
  
  function jelszomLenyitas(){
    if(jelszoNyitva == 'none') setJelszoNyitva('grid');
    else {
      setJelszoNyitva('none');
    }
  }

  function torlesLenyitas(){
    if(torlesNyitva == 'none') setTorlesNyitva('grid');
    else {
      setTorlesNyitva('none');
    }
  }

  function beallitasMenuApaphelyzetbe(){
    setAltNyitva('none');
    setJelszoNyitva('none');
    setTorlesNyitva('none');
    document.getElementById('jogC').value='-';
    document.getElementById('felnInp').value='';
    document.getElementById('emailIn').value='';
    document.getElementById('mJel1').value='';
    document.getElementById('mJel1').value='';
    document.getElementById('mJel2').value='';
    document.getElementById('hibaSzov').innerText='';
    document.getElementById('hibaUz').style.display='none';
  }

  function reszletekBetoltese(kivId){
    setAltNyitva('none');
    setJelszoNyitva('none');
    setTorlesNyitva('none');
    setTablDisp('none');
    setReszletDisp('grid');
    setKivalaszt(kivId);
    document.getElementById('hibaUz').style.display='none';
    let kivalasztott = JSON.parse(localStorage.getItem('users')).find(x => x.Id==kivId);
    let Mind=[];

    let url = (`/IMAGE/${kivalasztott.LogoEleresiUtja}`);
    if(kivalasztott.LogoEleresiUtja == '') url =(`/IMAGE/profil.hiany.jpg`);

    Mind.push (
      <div className='rszFejlec'>
        <div id='kivalaszottFhAdat' adat={kivalasztott} className='cimsorFelhnev'>{kivalasztott.Felhasznalonev}</div>
        <img src={url} className='profilkepAM' />
      </div> 
    )
    SetFejlec(Mind);

  }

  async function modositas(nev){
    let felhNev = null;
    let email = null;
    let jog = null;
    
    if(document.getElementById('felnInp').value != '') felhNev = document.getElementById('felnInp').value;
    if(document.getElementById('emailIn').value != '') email = document.getElementById('emailIn').value;
    if(document.getElementById('jogC').value != 'skip') jog = document.getElementById('jogC').value;
  
    // Profiladatok frissítése
    const response = await fetch(`https://localhost:44316/api/Profil/1?name=${nev}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'Felhasznalonev': felhNev,
        'Email': email,
        'Jogosultsag': jog,
        'Tema': null,
        'LogoEleresiUtja': null
      })
    });
  
    if (response.ok) {
      beallitasMenuApaphelyzetbe();
      const updatedUsers = JSON.parse(localStorage.getItem('users')).map(user => {
        if (user.Felhasznalonev == nev) {
          return {
            ...user,
            Felhasznalonev: felhNev || user.Felhasznalonev,
            Email: email || user.Email,
            Jogosultsag: jog != null ? jog : user.Jogosultsag
          };
        }
        return user;
      });
  
      localStorage.setItem('users', JSON.stringify(updatedUsers));
  
      profilokBetoltese(updatedUsers);
      visszaTablahoz();
    } else {
      console.error("Hiba történt a profil módosítása során.");
    }
  }
  
  async function getProfilok() {
    try {
      const response = await fetch(`https://localhost:44316/api/Profil`);
      const data = await response.json();
      mentsProfilokatLocalStorage(data);
    } catch (error) {
      console.error(error);
    }
  }
  function mentsProfilokatLocalStorage(profilok) {
    try {
      localStorage.setItem("users", JSON.stringify(profilok));
    } catch (error) {
      console.error("Hiba történt a mentés során:", error);
    }
  }
  useEffect(() => { getProfilok() }, [reszletDisp]);

  function hibaKiiratas(uzenet){
    document.getElementById('hibaSzov').innerText=uzenet;
    document.getElementById('hibaUz').style.display='grid';
  }

  function jelszoFrissites(){
    let jelszo1 = document.getElementById('mJel1').value;
    let jelszo2 = document.getElementById('mJel2').value;
    let kivalasztott = JSON.parse(localStorage.getItem('users')).find(x => x.Id==kivalasz);

    console.log(kivalasztott)

    const minta = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?/~`\-=\|])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/; 
    if(jelszo1=='' || jelszo2==''){
      hibaKiiratas('Töltse ki mindkét mezőt !');
    }
    else if(jelszo1 != jelszo2) {
      hibaKiiratas('A két jelszó nem egyezik !');
    } 
    else if (!minta.test(jelszo1)) {
      hibaKiiratas('A jelszó nem elég erős !')
    }
    else{
      frissitFetch(kivalasztott.Id, kivalasztott.Email, jelszo1);
    }
  }
  async function frissitFetch(id, email, ujJelszo) {
    const response = await fetch(`https://localhost:44316/api/Profil/ProfilJelszoUpdateModel?id=${id}&email=${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ UjJelszo: ujJelszo })
    });
    if(!response.ok){
      if(response.status == 401){
        hibaKiiratas("Hibás a jelszó !")
      }
      else if(response.status == 404){
        hibaKiiratas("Az e-mail cím nem található !")
      }
      else{
        hibaKiiratas("Szerver hiba. Kérlek próbáld meg később!")
        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`)
      }
      throw new Error(`HTTP hiba! Státuszkód: ${response.status}`)
    }
    else{
      hibaKiiratas("A jelszó módosítása sikeres volt !");
      beallitasMenuApaphelyzetbe();
    }
  }


  return (
    <div className='telsesAM'>
      <div className='profTablazat' style={{ display: tablDisp }}>
        <div className='szuroS'>
          <p className='szuroCim' onClick={szuroMegnyitas}>Szűrő</p>
          <div className='szuroSorok' style={{ display: szuroDisp }}>
            <div className='keresesSor'>
              <p>Felhasználónév:</p>
              <input type='text' className='nevKereses' id='nevKereses'></input>
            </div>
            <div className='keresesSor'>
              <p>Jogosultság:</p>
              <select id='jogCombo'>
                <option value='skip'>-</option>
                <option value='0'>Felhasználó</option>
                <option value='1'>Admin</option>
              </select>
            </div>
            <div className='keresesGomb' onClick={szures}>Keresés</div>
          </div>
        </div>
        {elemek.map(x => x)} 
      </div>
      <div className='profReszletek' style={{ display: reszletDisp }}>
        <div className='reszletKeret' key='egyetlenKeret'>
          <div className='visszaGomb' onClick={visszaTablahoz}>Vissza</div>
          {fejlec == '' ? console.log() : fejlec.map((x, index) => <div key={index}>{x}</div>)}


          <div className='lenyitosMenu' onClick={alatlanosLenyitas}>Általános beállítások</div>
          <div className='modCont' style={{ display: altNyitva }}>
            <div className='modSor'>
              <div className='baNeve'>Jogosultság:</div>
              <select id='jogC'>
                <option value='skip'>-</option>
                <option value='0'>Felhasználó</option>
                <option value='1'>Admin</option>
              </select>
            </div>

            <div className='modSor'>
              <div className='baNeve'>Felhasználónév:</div>
              <input type='text' id='felnInp'></input>
            </div>

            <div className='modSor'>
              <div className='baNeve'>E-mail cím:</div>
              <input type='text' id='emailIn'></input>
            </div>

            <button className='altalnosMentes' onClick={() => modositas(JSON.parse(localStorage.getItem('users')).find(x => x.Id==kivalasz).Felhasznalonev)}>Mentés</button>
          </div>

          <div className='lenyitosMenu' onClick={jelszomLenyitas}>Jelszó beállítása</div>
          <div className='modCont' style={{ display: jelszoNyitva }}>
            <div id='hibaUz'>
              <div id='hibaSzov'></div>
            </div>
            <div className='modSor'>
                <p className='beallitasNeve'>Módosított Jelszó:</p>
                <input type='password' id='mJel1'></input>
              </div>
              <div className='modSor'>
                <p className='beallitasNeve'>Módosított Jelszó Újra:</p>
                <input type='password' id='mJel2'></input>
              </div>
              <button className='altalnosMentes' onClick={jelszoFrissites}>Jelszó Frissítése</button>
          </div>

          <div className='lenyitosMenu' onClick={torlesLenyitas}>Felhasználói fiók törlése</div>
          <div style={{display: torlesNyitva}} className='modCont'>{kivalasz!=-1 ? <ProfilTorles kidobando={kivalasz} kileptet='false'></ProfilTorles> : console.log()}</div>
        </div>
      </div>
      
      
    </div>
  );
}

export default AdminMenu;
