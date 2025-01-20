import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppReszletStilus from './AppReszlet.css';
import Kovetelmeny from './Kovetelmeny';
import VisszaOsszesitobe from './VisszaOsszesitobe';


function AppReszlet() {
    const location = useLocation();
    const appId = location.state.id;

    const giga=' GB';

    //Index alapján kikeresi az aktuális adatot: ezket kell majd visszaküldeni
    var kivalasztottApp= {
        'nev': 'Appli neve',
        'tahrely': '50',
        'kepEleresiUtja': '/kepek/nkSSO.png',
        'kategoria': 'Kategória Neve'
    }
    var minimumKovetelmeny={
        'GP':'M',
        'vidkaId':'0',
        'vidkaNeve':'Videókártya Neve',
        'procId':'0',
        'procNeve':'Processzor Neve',
        'ramId':'0',
        'ramNeve':'RAM Neve',
        'opId':'0',
        'opNeve':'Oprendszer Neve',
        'alaplapId':'0',
        'alaplapNeve':'Alaplap Neve'
    }
    var optimumKovetelmeny={
        'GP':'O',
        'vidkaId':'0',
        'vidkaNeve':'Videókártya Neve',
        'procId':'0',
        'procNeve':'Processzor Neve',
        'ramId':'0',
        'ramNeve':'RAM Neve',
        'opId':'0',
        'opNeve':'Oprendszer Neve',
        'alaplapId':'0',
        'alaplapNeve':'Alaplap Neve'
    }
    //---

  return (
    <div className='keret'>
        <div className='tartalom'>
            <div className='oszlopok'>
                <div className='balOSzlop'>
                    <h1 className='appNev'>{kivalasztottApp.nev}</h1>
                    <div className='elem'>
                        <h2 className='sorCim'>Kategória: </h2>
                        <h2>{kivalasztottApp.kategoria}</h2>
                    </div>
                    <div className='elem'>
                        <h2 className='sorCim'>Szükséges tárhely: </h2>
                        <h2>{kivalasztottApp.tahrely}{giga}</h2>
                    </div>
                </div>
                <div className='jobOSzlop'>
                    <img src={kivalasztottApp.kepEleresiUtja} className='nagyKep'></img>
                </div>
            </div>
            
            <div className='minimum'>
                <Kovetelmeny adatok={minimumKovetelmeny}></Kovetelmeny>
            </div>

            <div className='optimum'>
                <Kovetelmeny adatok={optimumKovetelmeny}></Kovetelmeny>
            </div>
            
        </div>
        <VisszaOsszesitobe></VisszaOsszesitobe>
    </div>
  );
}

export default AppReszlet;