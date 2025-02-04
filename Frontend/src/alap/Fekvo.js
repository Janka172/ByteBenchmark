import { useState } from 'react';
import FekvoStilus from './Fekvo.css';
import { Link } from 'react-router-dom';

function Fekvo() {

  return (
    <nav className="navbar">
        <Link to="/">Kezdőlap</Link>
        <Link>Rólunk</Link>
        <Link>Kontakt</Link>
    </nav>
    
  );
}

export default Fekvo;