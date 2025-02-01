import React from 'react';
import FooterStilus from './Footer.css';

function Footer(){
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">Beállítások</a>
        <a href="/oldalak/Profil">Profil</a>
      </div>
    </footer>
  );
}

export default Footer;
