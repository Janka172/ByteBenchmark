import { useEffect, useState } from 'react';
import ProfilTorles from './ProfilTorlese';
import Stilus from './Felh.css';
import JelszoModosito from './JelszoModosito';

function AdminMenu() {
  const [elemek, setElemek] = useState([]);
  const [reszletek, setReszletek] = useState([]);
  const [profilUrl, setProfilUrl] = useState('');
  const [kivalasz, setKivalaszt] = useState(-1);

  const [tablDisp, setTablDisp] = useState('grid');
  const [szuroDisp, setSzuroDisp] = useState('none');
  const [reszletDisp, setReszletDisp] = useState('none');

  const [altNyitva, setAltNyivta] = useState('none');

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

    document.getElementById('felInp').value = '';
    document.getElementById('emailInp').value = '';
    document.getElementById('jogCombo').value = 'skip';

    profilokBetoltese();
  }

  function alatlanosLenyitas(){
    if(altNyitva == 'none') setAltNyivta('grid');
    else setAltNyivta('none');

    console.log(altNyitva)
  }

  function reszletekBetoltese(kivId){
    setTablDisp('none');
    setReszletDisp('grid');
    setKivalaszt(kivId);
    let kivalasztott = JSON.parse(localStorage.getItem('users')).find(x => x.Id==kivId);
    let Mind=[];

    let url = (`/IMAGE/${kivalasztott.LogoEleresiUtja}`);
    if(kivalasztott.LogoEleresiUtja == '') url =(`/IMAGE/profil.hiany.jpg`);

    Mind.push (
      <div className='reszletKeret' key='egyetlenKeret'>
        <div className='visszaGomb' onClick={visszaTablahoz}>Vissza</div>
        <div className='rszFejlec'>
          <div className='cimsorFelhnev'>{kivalasztott.Felhasznalonev}</div>
          <img src={url} className='profilkepAM' />
        </div>
        
        <div id='alatBeLe' className='legnyitosMenu' onClick={alatlanosLenyitas}>Általános beállítások</div>
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
            <input type='text' id='felInp'></input>
          </div>

          <div className='modSor'>
            <div className='baNeve'>E-mail cím:</div>
            <input type='text' id='emailInp'></input>
          </div>

          <button className='altalnosMentes' onClick={() => modositas(kivalasztott.Felhasznalonev)}>Mentés</button>
        </div>

        <div id='jelszoBeLe' className='legnyitosMenu'>Jelszó beállítások</div>
        <div className='modCont'>
          <div className='modSor'>
              <p className='beallitasNeve'>Módosított Jelszó:</p>
              <input type='password' id='uJel1'></input>
            </div>
            <div className='modSor'>
              <p className='beallitasNeve'>Módosított Jelszó Újra:</p>
              <input type='password' id='uJel2'></input>
            </div>
            <button className='altalnosMentes' onClick={jelszoFrissites}>Jelszó Frissítése</button>
        </div>

        <div id='torlesBeLe' className='legnyitosMenu'>Felhasználói fiók törlése</div>

      </div>
    )

    setReszletek(Mind);
  }

  async function modositas(nev){
    let felhNev = null;
    let email = null;
    let jog = null;

    if(document.getElementById('felInp').value != '') felhNev = document.getElementById('felInp').value;
    if(document.getElementById('emailInp').value != '') email = document.getElementById('emailInp').value;
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

  function jelszoFrissites(){

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
        {reszletek.map(x => x)}
      </div>
      
      <div style={{ display: reszletDisp }}>{kivalasz!=-1 ? <ProfilTorles kidobando={kivalasz} kileptet='false'></ProfilTorles> : console.log()}</div>
    </div>
  );
}

export default AdminMenu;
