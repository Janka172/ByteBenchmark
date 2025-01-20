import React from 'react';
import KovetelmenyStilus from './Kovetelmeny.css';
import { Link } from 'react-router-dom';

function Kovetelmeny(adatok) {
    var adat=adatok.adatok;

    var cimsor='';
    if(adat.GP=='M'){
        cimsor='Minimális követelmények';
    }
    else{
        cimsor='Optimális követelmények';
    }

    var vidk='v';
    var proc='p';
    var opre='o';
    var ram='r';
    var alap='a';

  return (
    <div className="kovetelm">
        <h1>{cimsor}</h1>

        <div className='sor'>
            <h2 className='sorfCime'>Videókártya: </h2>
            <h2 className='megnev'>{adat.vidkaNeve}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':vidk, 'id':adat.vidkaId}}><button className='tovabbi'>További részletek</button></Link>
        </div>

        <div className='sor'>
            <h2 className='sorfCime'>Processzor: </h2>
            <h2 className='megnev'>{adat.procNeve}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':proc, 'id':adat.procId}}><button className='tovabbi'>További részletek</button></Link>
        </div>

        <div className='sor'>
            <h2 className='sorfCime'>RAM: </h2>
            <h2 className='megnev'>{adat.ramNeve}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':ram, 'id':adat.ramId}}><button className='tovabbi'>További részletek</button></Link>
        </div>

        <div className='sor'>
            <h2 className='sorfCime'>Operációsrendszer: </h2>
            <h2 className='megnev'>{adat.opNeve}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':opre, 'id':adat.opId}}><button className='tovabbi'>További részletek</button></Link>
        </div>

        <div className='sor'>
            <h2 className='sorfCime'>Alaplap: </h2>
            <h2 className='megnev'>{adat.alaplapNeve}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':alap, 'id':adat.alaplapId}}><button className='tovabbi'>További részletek</button></Link>
        </div>
    </div>
  );
}

export default Kovetelmeny;