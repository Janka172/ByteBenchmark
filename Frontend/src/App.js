import { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Kezdolap from './oldalak/Kezdolap';
import Alkalmazasok from './oldalak/Alkalmazasok';
import Sidebar from './alap/Sidebar';
import Fekvo from './alap/Fekvo';
import Footer from './alap/Footer';
import ImageWithText from './alap/Borito';
import Alkatreszek from './oldalak/Alkatreszek';
import AlkalmazasReszletek from './oldalak/AlkalmazasReszletek';
import AlkatreszReszletek from './oldalak/AlkatreszReszletek';
import Sajat from './sajatSetup/Sajat';
import UjAlkalmazas from './oldalak/UjAlkalmazas';
import UjAlkatresz from './oldalak/UjAlkatresz';
import Profil from './oldalak/Profil';
import Regisztr from "./felhasznalokezeles/Regiszt";
import Reg from './oldalak/Reg';
import Rolunk from './oldalak/Rolunk';
import Kontakt from './oldalak/Kontakt';

function App() {
  const [profilk, setProfilk] = useState([]);
  const [betoltP, setBetoltP] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);

  async function getProfilok() {
    try {
      const response = await fetch(`https://localhost:44316/api/Profil`);
      const data = await response.json();
      setProfilk(data);
      setBetoltP(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    if(!betoltP){
      mentsProfilokatLocalStorage(profilk);
    }
  }, [betoltP]);
  useEffect(() => {
    getProfilok();
    temaBeallitasa();
  }, []);

  function mentsProfilokatLocalStorage(profilok) {
    try {
      localStorage.setItem("users", JSON.stringify(profilok));
      console.log();
    } catch (error) {
      console.error("Hiba történt a mentés során:", error);
    }
  }

  function temaBeallitasa() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      document.body.style.backgroundColor = user.Tema === 'dark' ? 'rgb(61, 61, 61)' : 'rgb(196, 196, 196)';
    } else {
      document.body.style.backgroundColor = 'rgb(61, 61, 61)';
    }
  }
  

  return (
    <main>
      <BrowserRouter>
          <div id='fent'></div>
          <ImageWithText></ImageWithText>
          <Sidebar></Sidebar> 
          <Fekvo></Fekvo> 
      
          <>
            <Routes>

              <Route path='/' index element={<Kezdolap />} />
              <Route path='/oldalak/Alkalmazasok' index element={<Alkalmazasok />} />
              <Route path='/oldalak/Alkatreszek' index element={<Alkatreszek />} />
              <Route path='/oldalak/AlkalmazasReszletek' index element={<AlkalmazasReszletek />} />
              <Route path='/oldalak/AlkatreszReszletek' index element={<AlkatreszReszletek />} />
              <Route path='/oldalak/SajatSetup' index element={<Sajat />} />
              <Route path='/oldalak/Profil' index element={<Profil />} />
              <Route path='/oldalak/Reg' index element={<Reg />} />
              <Route path="/oldalak/Rolunk" element={<Rolunk />} />
              <Route path="/oldalak/Kontakt" element={<Kontakt />} />
              <Route path='/oldalak/UjAlkalmazas' index element={<UjAlkalmazas />} />
              <Route path='/oldalak/UjAlkatresz' index element={<UjAlkatresz />} />
              
            </Routes>
          </>

          <img src='/BB.logo.png' id='rogzitettLogo'></img>
          
          <div className='marginBottom'></div>
          
          <Footer></Footer>
        </BrowserRouter>
    </main>
    
  );
}

export default App;

