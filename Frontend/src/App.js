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
import AlkatreszReszletek from './oldalak/AlkatreszReszletek.js';
import Sajat from './sajatSetup/Sajat.js';
import UjAlkalmazas from './oldalak/UjAlkalmazas.js';
import UjAlkatresz from './oldalak/UjAlkatresz.js';
import Profil from './oldalak/Profil.js';
import Regisztr from "./felhasznalokezeles/Regiszt.js";
import Bejelentkezes from "./felhasznalokezeles/Bejelentkezes";
import Dashboard from "./felhasznalokezeles/Dashboard";

function App() {
  const [profilk, setProfilk] = useState([]);
  const [betoltP, setBetoltP] = useState(true);

  //Újratöltéskor kijelntkezet
  //localStorage.removeItem("loggedInUser");

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
  }, []);

  function mentsProfilokatLocalStorage(profilok) {
    try {
      localStorage.setItem("users", JSON.stringify(profilok));
      console.log("Profilok sikeresen mentve a localStorage-be.");
    } catch (error) {
      console.error("Hiba történt a mentés során:", error);
    }
  }

  return (
  <main>
    <BrowserRouter>
        <div id='fent'></div>
        <Sidebar></Sidebar> 
        <ImageWithText></ImageWithText>
        <Fekvo></Fekvo> 
    
        <div className='Tartalmak'>
        <Routes>

          <Route path='/' index element={<Kezdolap />} />
          <Route path='/oldalak/Alkalmazasok' index element={<Alkalmazasok />} />
          <Route path='/oldalak/Alkatreszek' index element={<Alkatreszek />} />
          <Route path='/oldalak/AlkalmazasReszletek' index element={<AlkalmazasReszletek />} />
          <Route path='/oldalak/AlkatreszReszletek' index element={<AlkatreszReszletek />} />
          <Route path='/oldalak/SajatSetup' index element={<Sajat />} />
          <Route path='/oldalak/UjAlkalmazas' index element={<UjAlkalmazas />} />
          <Route path='/oldalak/UjAlkatresz' index element={<UjAlkatresz />} />
          <Route path='/oldalak/Profil' index element={<Profil />} />

          <Route path="/" element={<Regisztr />} />
          <Route path="/login" element={<Bejelentkezes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        
         
        <Footer></Footer>
      </BrowserRouter>
  </main>
    
  );
}

export default App;

