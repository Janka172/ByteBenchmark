import React, { useState, useEffect } from 'react';
import KovetelmenyStilus from './Kovetelmeny.css';
import { Link } from 'react-router-dom';

function Kovetelmeny(adatok) {
    var adat=adatok.adatok;
    var cimsor='';
    if(adat.Gepigeny=='minimum') cimsor='Minimális követelmények';
    else cimsor='Optimális követelmények';

    var [videokartya, setVideokartya] = useState('');
    var [betoltveV, setBetoltveV] = useState(true);
    var [processzor, setProcesszor] = useState('');
    var [betoltveP, setBetoltveP] = useState(true);
    var [ramAdat, setRam] = useState('');
    var [betoltveR, setBetoltveR] = useState(true);
    var [oprendszer, setOprendszer] = useState('');
    var [betoltveO, setBetoltveO] = useState(true);
    var [alaplap, setAlaplap] = useState('');
    var [betoltveA, setBetoltveA] = useState(true);


    var vidk='v';
    var proc='p';
    var opre='o';
    var ram='r';
    var alap='a';

    async function getVideokartya() {
      try {
        const response = await fetch(`https://localhost:44316/api/Videokartya/0?name=${adat.VidekortyaNev}`);
        const data = await response.json();
        setVideokartya(data);
        setBetoltveV(false);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => { getVideokartya(); }, [adat]);

    async function getProcesszor() {
      try {
        const response = await fetch(`https://localhost:44316/api/Processzor/0?name=${adat.ProcesszorNev}`);
        const data = await response.json();
        setProcesszor(data);
        setBetoltveP(false);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => { getProcesszor(); }, [adat]);

    async function getRam() {
      try {
        const response = await fetch(`https://localhost:44316/api/Ram/0?name=${adat.RamNeve}`);
        const data = await response.json();
        setRam(data);
        setBetoltveR(false);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => { getRam(); }, [adat]);

    async function getOpRendszer() {
      try {
        const response = await fetch(`https://localhost:44316/api/Oprendszer/0?name=${adat.OprendszerNev}`);
        const data = await response.json();
        setOprendszer(data);
        setBetoltveO(false);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => { getOpRendszer(); }, [adat]);

    async function getAlaplap() {
      try {
        const response = await fetch(`https://localhost:44316/api/Alaplap/0?name=${adat.AlaplapNeve}`);
        const data = await response.json();
        setAlaplap(data);
        setBetoltveA(false);
      } catch (error) {
        console.error(error);
      }
    }
    useEffect(() => { getAlaplap(); }, [adat]);

    var [megjelenes, setMegjelenes] = useState('none');
    
    useEffect(() => {
        if(!(betoltveV && betoltveP && betoltveR && betoltveO && betoltveA)){
            setMegjelenes('block');
        }
        else{
            setMegjelenes('none');
        }
    }, [betoltveV, betoltveP, betoltveR, betoltveO, betoltveA])

  return (
    <div className="kovetelm">
        <h1>{cimsor}</h1>

        <div className='sor'>
            <h2 className='sorfCime'>Videókártya: </h2>
            <h2 className='megnev'>{adat.VidekortyaNev}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':vidk, 'id': videokartya}} style={{display: megjelenes}}><button className='tovabbi'>További részletek</button></Link>
        </div>

        <div className='sor'>
            <h2 className='sorfCime'>Processzor: </h2>
            <h2 className='megnev'>{adat.ProcesszorNev}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':proc, 'id': processzor}} style={{display: megjelenes}}><button className='tovabbi'>További részletek</button></Link>
        </div>

        <div className='sor'>
            <h2 className='sorfCime'>RAM: </h2>
            <h2 className='megnev'>{adat.RamNeve} - {adat.RamMeret}GB</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':ram, 'id': ramAdat}} style={{display: megjelenes}}><button className='tovabbi'>További részletek</button></Link>
        </div>

        <div className='sor'>
            <h2 className='sorfCime'>Operációsrendszer: </h2>
            <h2 className='megnev'>{adat.OprendszerNev}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':opre, 'id': oprendszer}} style={{display: megjelenes}}><button className='tovabbi'>További részletek</button></Link>
        </div>

        <div className='sor'>
            <h2 className='sorfCime'>Alaplap: </h2>
            <h2 className='megnev'>{adat.AlaplapNeve}</h2>
            <Link to="/oldalak/AlkatreszReszletek" state={{'tipus':alap, 'id': alaplap}} style={{display: megjelenes}}><button className='tovabbi'>További részletek</button></Link>
        </div>
    </div>
  );
}

export default Kovetelmeny;