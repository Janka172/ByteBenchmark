import { useState, useEffect } from 'react';
import Stilus from './Felh.css';

function JelszoModosito() {
  const [ujJelszoMegjelnik, setUjJelszoMegjelnik] = useState('none');
  const [regiJelszoMegjelnik, setregiJelszoMegjelnik] = useState('grid');

  function jelszoEllenorzes(){
    const salt = JSON.parse(localStorage.getItem('loggedInUser')).Jelszo;
    const eredetiHash = JSON.parse(localStorage.getItem('loggedInUser')).JelszoUjra;
    const beirtHash = hashJelszo(document.getElementById('eJel1').value, salt);
    
    if(eredetiHash != beirtHash){
        hibaKiiratas('A jelszavak nem egyeznek meg a jelenlegiekkel !');
    }
    else if(document.getElementById('eJel1').value != document.getElementById('eJel2').value) {
      hibaKiiratas('A két jelszó nem egyezik !');
    }
    else {
        setregiJelszoMegjelnik('none');
        setUjJelszoMegjelnik('grid');
        document.getElementById('hibaU').style.display='none';
  
        document.getElementById('uJel1').value='';
        document.getElementById('uJel2').value='';
    }
  }

  async function hashJelszo(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );
    const derivedKey = await window.crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: new Uint8Array(atob(salt).split("").map(c => c.charCodeAt(0))),
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        256
    );
    return btoa(String.fromCharCode(...new Uint8Array(derivedKey)));
}


  function hibaKiiratas(uzenet){
    document.getElementById('hibaSzoveg').innerText=uzenet;
    document.getElementById('hibaU').style.display='grid';
  }

  function megsem(){
    setregiJelszoMegjelnik('grid');
    setUjJelszoMegjelnik('none');
    document.getElementById('hibaU').style.display='none';
    document.getElementById('eJel1').value='';
    document.getElementById('eJel2').value='';
  }

  function jelszoFrissites(){
    let jelszo1 = document.getElementById('uJel1').value;
    let jelszo2 = document.getElementById('uJel2').value;
    if(jelszo1=='' || jelszo2==''){
        hibaKiiratas('Töltse ki mindkét mezőt !');
    }
    else if(jelszo1 != jelszo2) {
        hibaKiiratas('A két jelszó nem egyezik !');
    }
    else {
        frissitFetch(JSON.parse(localStorage.getItem('loggedInUser')).Id,JSON.parse(localStorage.getItem('loggedInUser')).Email, jelszo1);

        setregiJelszoMegjelnik('grid');
        setUjJelszoMegjelnik('none');
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

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hiba: ${response.status} - ${errorText}`);
    }
}

  return (
    <div className='jelszoMod'>
        <p className='jelszoModCim'>Jelszó Módosítása</p>
        <div className='regiJelszo' style={{display: regiJelszoMegjelnik}}>
          <div className='eredetiJelszo'>
            <div className='menuEle'>
              <p className='beallitasNeve'>Eredeti Jelszó:</p>
              <input type='password' id='eJel1'></input>
            </div>
            <div className='menuEle'>
              <p className='beallitasNeve'>Eredeti Jelszó Újra:</p>
              <input type='password' id='eJel2'></input>
            </div>
            <button className='jelszoMentes' onClick={jelszoEllenorzes}>Jelszavak Ellenőrzése</button>
          </div>
        </div>
        <div className='ujJelszo' style={{display: ujJelszoMegjelnik}}>
          <div className='menuEle'>
            <p className='beallitasNeve'>Módosított Jelszó:</p>
            <input type='password' id='uJel1'></input>
          </div>
          <div className='menuEle'>
            <p className='beallitasNeve'>Módosított Jelszó Újra:</p>
            <input type='password' id='uJel2'></input>
          </div>
          <button className='jelszoMentes' onClick={jelszoFrissites}>Jelszó Frissítése</button>
          <button className='jelszoMegsem' onClick={megsem}>Mégsem</button>
        </div>
      </div>
  );
}

export default JelszoModosito;
