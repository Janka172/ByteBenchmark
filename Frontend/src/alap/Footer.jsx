import React from 'react';
import FooterStilus from './Footer.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Kijelentkezes from '../felhasznalokezeles/Kijelentkezes';

function Footer() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profilUrl, setProfilUrl] = useState('');
  useEffect(() => {
    const updateUser = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    window.addEventListener("userLoggedIn", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("userLoggedIn", updateUser);
    };
  }, []);

  useEffect(()=>{
    if(loggedInUser) 
    {
      console.log(JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja)
      if(JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja == '') setProfilUrl(`/IMAGE/profil.hiany.jpg`);
      else setProfilUrl(`/IMAGE/${JSON.parse(localStorage.getItem("loggedInUser")).LogoEleresiUtja}`);
    }
  },[loggedInUser])

  return (
    <footer className="footer">
      {loggedInUser ? 
        <div className="footContainer">
          <div className="footProfil">
          <img src={profilUrl} className='profilkep' />
          <p className='felhnev'>{JSON.parse(localStorage.getItem("loggedInUser")).Felhasznalonev}</p>
          </div>
          <div className="footMenu">
            <Kijelentkezes></Kijelentkezes>
            <a href="/oldalak/Profil">Profil Beállítások</a>
          </div>
        </div>
        : 
        <div className="footer-links">
          <a href="/">Bejelentkezés</a>
          <a href="/oldalak/Reg">Regisztráció</a>
        </div>
        }  
    </footer>
  );
}

export default Footer;