import { useState, useEffect } from 'react';
import FekvoStilus from './Fekvo.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Fekvo() {
  const location = useLocation();
  function kivalaszt(azon) {
    const fekvoElems = document.getElementsByClassName('fekvoElem');
    for (let i = 0; i < fekvoElems.length; i++) {
      fekvoElems[i].style.backgroundColor = '';
    }

    if (azon) {
      try {
        document.getElementById(azon).style.backgroundColor = 'rgb(194, 40, 40)';
      } catch {
        console.error();
      }
    }
  }
  useEffect(() => {
    const utazasok = {
      "/": "F1",
      "/oldalak/Rolunk": "F2",
      "/oldalak/Kontakt": "F3"
    };

    const kivId = utazasok[location.pathname] || null;
    kivalaszt(kivId);
  }, [location.pathname]);

  return (
    <nav className="navbar">
        <Link to="/" id='F1' className='fekvoElem'>Kezdőlap</Link>
        <Link to="/oldalak/Rolunk" id='F2' className='fekvoElem'>Rólunk</Link>
        <Link to="/oldalak/Kontakt" id='F3' className='fekvoElem'>Kontakt</Link>
    </nav>
    
  );
}

export default Fekvo;