import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import SidebarStilus from './Sidebar.css';

function Sidebar() {
  const [sidebarNyitva, setsidebarNyitva] = useState(false);
  const location = useLocation();

  const open = () => setsidebarNyitva(true);
  const close = () => setsidebarNyitva(false);
  const kicsie = window.innerWidth <= 767;

  function kivalaszt(azon) {
    const navigElems = document.getElementsByClassName('navigElem');
    for (let i = 0; i < navigElems.length; i++) {
      navigElems[i].style.backgroundColor = '';
    }

    if (azon) {
      try {
        document.getElementById(azon).style.backgroundColor = 'rgb(194, 40, 40)';
      } catch {
        console.error();
      }
    }

    close();
  }

  useEffect(() => {
    const utazasok = {
      "/oldalak/Alkalmazasok": "L1",
      "/oldalak/Alkatreszek": "L2",
      "/oldalak/SajatSetup": "L3",
      "/oldalak/UjAlkalmazas": "L4",
      "/oldalak/UjAlkatresz": "L5",
    };

    const kivId = utazasok[location.pathname] || null;
    kivalaszt(kivId);
  }, [location.pathname]);

  function belepettE(){
    if( JSON.parse(localStorage.getItem("loggedInUser"))) {
      if(JSON.parse(localStorage.getItem("loggedInUser")).Jogosultsag == 0) {
        document.getElementById('L4').style.display='none';
        document.getElementById('L5').style.display='none';
      }
      else {
        document.getElementById('L4').style.display='grid';
        document.getElementById('L5').style.display='grid';
      }
    }
    else {
      document.getElementById('L4').style.display='none';
      document.getElementById('L5').style.display='none';
    }

  }
  useEffect(() => belepettE(), []);

  return (
    <div>
      <div 
        className="sidebar blockSidebar balAnim" 
        style={{ width: sidebarNyitva ? (kicsie ? '40%' : 'auto') : '0', display: sidebarNyitva ? 'block' : 'none' }} id="mySidebar">
        <button className="navigElem gombi visszaGomb" onClick={close}>Vissza &times;</button>
        <Link to="/oldalak/Alkalmazasok" className="navigElem gombi" id='L1'>Alkalmazások</Link>
        <Link to="/oldalak/Alkatreszek" className="navigElem gombi" id='L2'>Alkatrészek</Link>
        <Link to="/oldalak/SajatSetup" className="navigElem gombi" id='L3'>Saját setup</Link>
        <Link to="/oldalak/UjAlkalmazas" className="navigElem gombi" id='L4' >Új alkalmazás</Link>
        <Link to="/oldalak/UjAlkatresz" className="navigElem gombi" id='L5' >Új alkatrész</Link>
      </div>
      <div id="hambiGomb" style={{ marginLeft: sidebarNyitva ? '25%' : '0' }}>
        <button className="hambiGombocska" onClick={open} id="openNav" style={{ display: sidebarNyitva ? 'none' : 'inline-block' }}>&#9776;</button>
      </div>
    </div>
  );
}

export default Sidebar;
