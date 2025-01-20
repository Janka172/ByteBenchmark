import { useState } from 'react';
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


function App() {

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

          </Routes>
        </div>
        
         
        <Footer></Footer>
      </BrowserRouter>
  </main>
    
  );
}

export default App;

