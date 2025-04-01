import { useState, useEffect, useRef } from 'react';
import Stilus from './Felh.css';
import JelszoModosito from './JelszoModosito';
import AdminMenu from './AdminMenu';
import ProfilTorles from './ProfilTorlese';
import SetupBeallitasok from '../sajatSetup/SetupBeallitasok';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function Beallitasok() {
  const [altDisp, setAltDisp] = useState('grid');
  const [biztDisp, setBiztDisp] = useState('none');
  const [adminDisp, setAdminDisp] = useState('none');
  const [setupDisp, setSetupDisp] = useState('none');
  const [activeMenu, setActiveMenu] = useState('alt');
  const [vanHiba, setVanHiba] = useState('none');
  const [selectedFile, setSelectedFile] = useState(null);
  const [atmKep, setAtmKep] = useState(null);
  const [profilUrl, setProfilUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const cropperRef = useRef(null); // Reference for the cropper

  useEffect(() => {
    alapMenuKivalasztas();

    if (JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja === '') {
      setProfilUrl(`/IMAGE/profil.hiany.jpg`);
    } else {
      setProfilUrl(`/IMAGE/${JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja}`);
    }
  }, []);

  function alapMenuKivalasztas() {
    setActiveMenu('alt');
    setAltDisp('grid');
    setAdminDisp('none');
    setSetupDisp('none');
    setBiztDisp('none');
  }

  function altKiv() {
    setActiveMenu('alt');
    setAltDisp('grid');
    setAdminDisp('none');
    setSetupDisp('none');
    setBiztDisp('none');
    document.getElementById('hibaU').style.display = 'none';
  }

  function biztKiv() {
    setActiveMenu('bizt');
    setAltDisp('none');
    setAdminDisp('none');
    setSetupDisp('none');
    setBiztDisp('grid');
    document.getElementById('hibaU').style.display = 'none';
  }

  function adminKiv() {
    setActiveMenu('admin');
    setAltDisp('none');
    setBiztDisp('none');
    setSetupDisp('none');
    setAdminDisp('grid');
    document.getElementById('hibaU').style.display = 'none';
  }

  function setKiv() {
    setActiveMenu('setup');
    setAltDisp('none');
    setAdminDisp('none');
    setBiztDisp('none');
    setSetupDisp('grid');
    document.getElementById('hibaU').style.display = 'none';
  }

  // Kép kiválasztása és előkészítése vágásra
  const kepValasztas = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAtmKep(URL.createObjectURL(file));
    }
  };

  // Kép vágása
  const getCroppedImage = () => {
    if(atmKep){
      const cropper = cropperRef.current.cropper;
      return cropper.getCroppedCanvas({
        width: 300,
        height: 300,
      }).toDataURL();
    }
    return null;
  };

  // Kép feltöltése
  const uploadCroppedImage = async (croppedImage) => {
    if(atmKep){
      const blob = await fetch(croppedImage).then(res => res.blob());

      const fileExtension = selectedFile.name.split('.').pop();
      const fileNameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
  
      const now = new Date();
      const timestamp = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  
      const newFileName = `${fileNameWithoutExt}_${timestamp}.${fileExtension}`;
  
      const formData = new FormData();
      formData.append("file", blob, newFileName);
  
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
          setProfilUrl(`/IMAGE/${data.file_name}`);
          return data.file_name;
        } else {
          console.error("Hiba történt:", data.message);
          return null;
        }
      } catch (error) {
        console.error("Hálózati hiba:", error);
        return null;
      }
    }
  };

  async function altalanosModositasa() {
    let croppedImage = getCroppedImage();
    let logoEleresiUtja = await uploadCroppedImage(croppedImage);

    let nev = JSON.parse(localStorage.getItem("loggedInUser")).Felhasznalonev;

    let tema = null;
    if (document.getElementById('comoSzin') && document.getElementById('comoSzin').value !== JSON.parse(localStorage.getItem('loggedInUser')).Tema) {
      tema = document.getElementById('comoSzin').value;
    }

    let felhNev = null;
    if (document.getElementById('felhNInp') && document.getElementById('felhNInp').value !== '') {
      felhNev = document.getElementById('felhNInp').value;
    }

    let email = null;
    if (document.getElementById('emailNInp') && document.getElementById('emailNInp').value !== ('' || JSON.parse(localStorage.getItem('loggedInUser')).Email)) {
      email = document.getElementById('emailNInp').value;
    }

    // Profiladatok frissítése
    const response = await fetch(`https://localhost:44316/api/Profil/1?name=${nev}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Felhasznalonev: felhNev,
        Email: email,
        Jogosultsag: -1,
        Tema: tema,
        LogoEleresiUtja: logoEleresiUtja || null,
      }),
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
  };

  return (
    <div className='teljesBeallitas'>
      <div className='menuOszlop'>
        <div className={`oszlopElem ${activeMenu == 'alt' ? 'active' : ''}`} id='alt' onClick={altKiv} style={{ backgroundColor: activeMenu == 'alt' ? 'rgb(233, 203, 203)' : '' }}>Általános Profil Beállítások</div>
        <div className={`oszlopElem ${activeMenu == 'bizt' ? 'active' : ''}`} id='bizt' onClick={biztKiv} style={{ backgroundColor: activeMenu == 'bizt' ? 'rgb(233, 203, 203)' : '' }}>Biztonsági Profil Beállítások</div>
        <div className={`oszlopElem ${activeMenu == 'setup' ? 'active' : ''}`} id='setup' onClick={setKiv} style={{ backgroundColor: activeMenu == 'setup' ? 'rgb(233, 203, 203)' : '' }}>Saját Setup Beállítások</div>
        <div className={`oszlopElem ${activeMenu == 'admin' ? 'active' : ''}`} id='admin' onClick={adminKiv} style={{ backgroundColor: activeMenu == 'admin' ? 'rgb(233, 203, 203)' : '', display: JSON.parse(localStorage.getItem("loggedInUser")).Jogosultsag == 1 ? 'grid' : 'none' }}>Admin Menü</div>
      </div>

      <div className='beallitasiReszletek'>
        <div className='hibaUzi' id='hibaU' style={{ display: vanHiba }}>
          <p id='hibaSzoveg'></p>
        </div>

        <div className='altalanos' style={{ display: altDisp }}>
          <div className='profilEsCim'>
            <p className='altBeCim'>Általános Profil Beállitások</p>
            <img src={profilUrl} className='profilkepBeall' />
          </div>

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
            <input type="file" accept="*" onChange={kepValasztas} />
            {atmKep && (
              <div className="mt-2">
                <p className="beallitasNeve">Vágás:</p>
                <Cropper
                  src={atmKep}
                  style={{ height: 400, width: '100%' }}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  guides={false}
                  ref={cropperRef}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                />
              </div>
            )}
          </div>

          <button className='altalnosMentes' onClick={() => {
            
            if(atmKep){
              const croppedImage = getCroppedImage();
              altalanosModositasa(croppedImage);
            }
            else{
              altalanosModositasa();
            }
          }}>Mentés</button>
        </div>

        <div className='biztonsagi' style={{ display: biztDisp }}>
          <JelszoModosito></JelszoModosito>
          <ProfilTorles kidobando={JSON.parse(localStorage.getItem('loggedInUser')).Id} kileptet='true'></ProfilTorles>
        </div>

        <div className='setup' style={{ display: setupDisp }}>
          <SetupBeallitasok></SetupBeallitasok>
        </div>

        <div className='admin' style={{ display: adminDisp }}>
          <AdminMenu></AdminMenu>
        </div>
      </div>
    </div>
  );
}

export default Beallitasok;
