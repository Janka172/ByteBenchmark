import React from 'react';
import FooterStilus from './Footer.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Kijelentkezes from '../felhasznalokezeles/Kijelentkezes';

function Footer() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [profilUrl, setProfilUrl] = useState('');

  function updateUser() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  };

  useEffect(() => updateUser(), []);

  useEffect(()=>{
    if(loggedInUser) 
    {
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
            <Link to="/oldalak/Profil">Beállítások</Link>
          </div>
        </div>
        : 
        <div className="footer-links">
          <Link to="/">Bejelentkezés</Link>
          <Link to="/oldalak/Reg">Regisztráció</Link>
        </div>
        }  
    </footer>
  );
}

export default Footer;