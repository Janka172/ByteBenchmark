import { useState, useEffect } from 'react';
import Stilus from './Felh.css';
import JelszoModosito from './JelszoModosito';

function Beallitasok() {
  const [altDisp, setAltDisp] = useState('grid');
  const [biztDisp, setBiztDisp] = useState('none');
  const [activeMenu, setActiveMenu] = useState('alt');
  const [ujJelszoMegjelnik, setUjJelszoMegjelnik] = useState('none');
  const [regiJelszoMegjelnik, setregiJelszoMegjelnik] = useState('grid');
  const [vanHiba, setVanHiba] = useState('none');
  const [selectedFile, setSelectedFile] = useState(null); // fájl tárolása
  const [atmKep, setAtmKep] = useState(null); // előnézet
  const [fileUrl, setFileUrl] = useState(""); // feltöltött kép URL-je

  useEffect(() => {
    alapMenuKivalasztas();
  }, []);

  function alapMenuKivalasztas() {
    setActiveMenu('alt');
    setAltDisp('grid');
    setBiztDisp('none');
  }

  function altKiv() {
    setActiveMenu('alt');
    setAltDisp('grid');
    setBiztDisp('none');
    document.getElementById('hibaU').style.display='none';
  }

  function biztKiv() {
    setActiveMenu('bizt');
    setAltDisp('none');
    setBiztDisp('grid');
    document.getElementById('hibaU').style.display='none';
  }

  // Kép kiválasztása
  const kepValasztas = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedFile(file); // fájl tárolása
        setAtmKep(URL.createObjectURL(file)); // előnézet generálása
    }
  }

  const altalanosModositasa = async () => {
    let nev= JSON.parse(localStorage.getItem("loggedInUser")).Felhasznalonev;

    let tema = null;
    if (document.getElementById('comoSzin') && document.getElementById('comoSzin').value != JSON.parse(localStorage.getItem('loggedInUser')).Tema) {
      tema = document.getElementById('comoSzin').value;
    }

    let felhNev = null;
    if (document.getElementById('felhNInp') && document.getElementById('felhNInp').value != '') {
      felhNev = document.getElementById('felhNInp').value;
    }

    let email = null;
    if (document.getElementById('emailNInp') && document.getElementById('emailNInp').value != ('' || JSON.parse(localStorage.getItem('loggedInUser')).Email)) {
      email = document.getElementById('emailNInp').value;
    }

    // Kép feltöltése, ha van
    let logoEleresiUtja = null;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json",
          },
          mode: "cors",
        });
        const data = await response.json();
        if (response.ok) {
          logoEleresiUtja = data.file_name;
          setFileUrl(data.file_name);
        } else {
          console.error("Hiba történt:", data.message);
        }
      } catch (error) {
        console.error("Hálózati hiba:", error);
      }
    }
    
    // Profiladatok frissítése
    const response = await fetch(`https://localhost:44316/api/Profil/1?name=${nev}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'Felhasznalonev': felhNev,
        'Email': email,
        'Jogosultsag': null,
        'Tema': tema,
        'LogoEleresiUtja': logoEleresiUtja
      })
    });
    
    if (response.ok) {
      let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      if (felhNev != null) loggedInUser.Felhasznalonev = felhNev;
      if (email != null) loggedInUser.Email = email;
      if (tema != null) loggedInUser.Tema = tema;
      if (logoEleresiUtja != null) loggedInUser.LogoEleresiUtja = logoEleresiUtja;

      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    }

    window.location.reload();
  }

  return (
    <div className='teljesBeallitas'>
      <div className='menuOszlop'>
        <div className={`oszlopElem ${activeMenu === 'alt' ? 'active' : ''}`} id='alt' onClick={altKiv} style={{ backgroundColor: activeMenu === 'alt' ? 'rgb(233, 203, 203)' : '' }}>Általános</div>
        <div className={`oszlopElem ${activeMenu === 'bizt' ? 'active' : ''}`} id='bizt' onClick={biztKiv} style={{ backgroundColor: activeMenu === 'bizt' ? 'rgb(233, 203, 203)' : '' }}>Biztonság</div>
      </div>

      <div className='beallitasiReszletek'>
        <div className='hibaUzi' id='hibaU' style={{display: vanHiba}}>
          <p id='hibaSzoveg'></p>
        </div>

        <div className='altalanos' style={{ display: altDisp }}>
          <p className='altBeCim'>Általános Beállitások</p>

          <div className='menuEle'>
            <p className='beallitasNeve'>Felhasználónév:</p>
            <input type='text' id='felhNInp'></input>
          </div>

          <div className='menuEle'>
            <p className='beallitasNeve'>E-mail cím:</p>
            <input type='text' id='emailInp'></input>
          </div>

          <div className='menuEle'>
            <p className='beallitasNeve'>Téma:</p>
            <select id='comoSzin'>
              <option value='dark'>Sötét</option>
              <option value='light'>Világos</option>
            </select>
          </div>

          <div className="menuEle">
            <p className='beallitasNeve'>Profilkép:</p>
            <input type="file" accept="*" onChange={kepValasztas}/>
            {atmKep && (
                <div className="mt-2">
                    <p className="beallitasNeve">Előnézet:</p>
                    <div className='kepConti'>
                      <img src={atmKep} alt="Profilkép előnézete" className="profilElolnezet" />
                    </div>
                </div>
            )} 
          </div>

          <button className='altalnosMentes' onClick={altalanosModositasa}>Mentés</button>
        </div>

        <div className='biztonsagi' style={{ display: biztDisp }}>
          <JelszoModosito></JelszoModosito>
        </div>
      </div>
    </div>
  );
}

export default Beallitasok;
