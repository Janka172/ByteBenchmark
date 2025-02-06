import React, { useState } from 'react';
import { Link } from "react-router-dom";
import SidebarStilus from './Sidebar.css';

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const open = () => {
    setSidebarOpen(true);
  };

  const close = () => {
    setSidebarOpen(false);
  };

  const kicsie = window.innerWidth <= 767;

  function kivalaszt(azon){
    const navigElems = document.getElementsByClassName('navigElem');
    for (let i = 0; i < navigElems.length; i++) {
      navigElems[i].style.backgroundColor = '';
    }

    try {
      document.getElementById(azon).style.backgroundColor = 'white';
    } catch {
      console.error();
    }
  }

  return (
    <div>
      <div className="sidebar blockSidebar balAnim" style={{ width: sidebarOpen ? (kicsie ? '40%' : '25%') : '0', display: sidebarOpen ? 'block' : 'none',}} id="mySidebar">
        <button className="navigElem gombi visszaGomb" onClick={close}>Vissza &times;</button>
        <Link to="/oldalak/Alkalmazasok" className="navigElem gombi" id='L1' onClick={() => kivalaszt('L1')}>Alkalmazások</Link>
        <Link to="/oldalak/Alkatreszek" className="navigElem gombi" id='L2' onClick={() => kivalaszt('L2')}>Alkatrészek</Link>
        <Link to="/oldalak/SajatSetup" className="navigElem gombi" id='L3' onClick={() => kivalaszt('L3')}>Saját setup</Link>
        <Link to="/oldalak/UjAlkalmazas" className="navigElem gombi" id='L4' onClick={() => kivalaszt('L4')}>Új alkalmazás</Link>
        <Link to="/oldalak/UjAlkatresz" className="navigElem gombi" id='L5' onClick={() => kivalaszt('L5')}>Új alkatrész</Link>
      </div>

      <div id="hambiGomb" style={{ marginLeft: sidebarOpen ? '25%' : '0',}}>
        <button className="hambiGombocska" onClick={open} id="openNav" style={{display: sidebarOpen ? 'none' : 'inline-block',}}>&#9776;</button>
      </div>
    </div>
  );
}

export default Sidebar;
