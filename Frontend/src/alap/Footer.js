import React from 'react';
import FooterStilus from './Footer.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Kijelentkezes from '../felhasznalokezeles/Kijelentkezes';

function Footer() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);
    };

    updateUser(); // Azonnali ellenőrzés

    // 🔹 Figyeljük a localStorage változásait és az egyedi eseményt
    window.addEventListener("storage", updateUser);
    window.addEventListener("userLoggedIn", updateUser); // Egyedi bejelentkezési esemény

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("userLoggedIn", updateUser);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-links">
        {loggedInUser ? 
          <div className="footer-links">
            <Kijelentkezes></Kijelentkezes>
            <a href="/oldalak/Profil">Profil Beállítások</a>
          </div>
           : 
          <div className="footer-links">
            <a href="/">Bejelentkezés</a>
            <a href="/oldalak/Reg">Regisztráció</a>
          </div>
        }  
      </div>
    </footer>
  );
}

export default Footer;
