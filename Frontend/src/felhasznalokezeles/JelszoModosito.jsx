import { useState, useEffect } from 'react';
import Stilus from './Felh.css';

function JelszoModosito() {
  const [profilUrl, setProfilUrl] = useState('');
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja == '') setProfilUrl(`/IMAGE/profil.hiany.jpg`);
    else setProfilUrl(`/IMAGE/${JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja}`);
  },[]);

  function hibaKiiratas(uzenet){
    document.getElementById('hibaSzoveg').innerText=uzenet;
    document.getElementById('hibaU').style.display='grid';
  }

  function jelszoFrissites(){
    let jelszo1 = document.getElementById('uJel1').value;
    let jelszo2 = document.getElementById('uJel2').value;
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
      frissitFetch(JSON.parse(localStorage.getItem('loggedInUser')).Id,JSON.parse(localStorage.getItem('loggedInUser')).Email, jelszo1);
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
          if(response.status === 401){
              hibaKiiratas("Hibás a jelszó !")
          }
          else if(response.status === 404){
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
          document.getElementById('uJel1').value='';
          document.getElementById('uJel2').value='';
      }
    }

  return (
    <div className='jelszoMod'>
        <div className='profilEsCim'>
          <p className='jelszoModCim'>Jelszó Módosítása</p>
          <img src={profilUrl} className='profilkepBeall' />
        </div>
        <div className='ujJelszo'>
          <div className='menuEle'>
            <p className='beallitasNeve'>Módosított Jelszó:</p>
            <input type='password' id='uJel1'></input>
          </div>
          <div className='menuEle'>
            <p className='beallitasNeve'>Módosított Jelszó Újra:</p>
            <input type='password' id='uJel2'></input>
          </div>
          <button className='jelszoMentes' onClick={jelszoFrissites}>Jelszó Frissítése</button>
        </div>
      </div>
  );
}

export default JelszoModosito;