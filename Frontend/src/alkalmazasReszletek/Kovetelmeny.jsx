import React, { useState, useEffect } from 'react';
import KovetelmenyStilus from './Kovetelmeny.css';
import { Link } from 'react-router-dom';

function Kovetelmeny(adatok) {
  var adat=adatok.adatok;
  var cimsor='';
  if(adat.Gepigeny=='min') cimsor='Minimális követelmények';
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
        const response = await fetch(`https://localhost:44316/api/Videokartya/0?name=${adat.VidekortyaNev}&vram=${adat.VideokartyaVram}`);
        const data = await response.json();
        setVideokartya(data);
        console.log(data)
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
      const response = await fetch(`https://localhost:44316/api/Ram/0?name=${adat.RamNeve}&frekvencia=${adat.RamFrekvencia}&meret=${adat.RamMeret}`);
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
  function gombMegjelito(){
    if(!(betoltveV && betoltveP && betoltveR && betoltveO && betoltveA)){
      setMegjelenes('block');
    }
    else{
      setMegjelenes('none');
    }
  }

  useEffect(() => { 
    if(videokartya == null) getVideokartya();
    if(processzor == null) getProcesszor();
    if(ramAdat == null) getRam();
    if(oprendszer == null) getOpRendszer();
    if(alaplap == null) getAlaplap();
  })

  useEffect(() => { gombMegjelito(); }, [ ])
  useEffect(() => { gombMegjelito(); }, [ betoltveV, betoltveP, betoltveR, betoltveO, betoltveA ])
 

  return (
    <div className="kovetelm">
      <h1>{cimsor}</h1>

      <div className='sor'>
        <h2 className='sorfCime'>Videókártya: </h2>
        <h2 className='megnev'>{adat.VidekortyaNev} - {adat.VideokartyaVram}GB</h2>
        {videokartya && (
          <Link to="/oldalak/AlkatreszReszletek" state={{ 'tipus': vidk, 'id': videokartya }}>
            <button className='tovabbi'>További részletek</button>
          </Link>
        )}
      </div>

      <div className='sor'>
        <h2 className='sorfCime'>Processzor: </h2>
        <h2 className='megnev'>{adat.ProcesszorNev}</h2>
        {processzor && (
          <Link to="/oldalak/AlkatreszReszletek" state={{ 'tipus': proc, 'id': processzor }}>
            <button className='tovabbi'>További részletek</button>
          </Link>
        )}
      </div>

      <div className='sor'>
        <h2 className='sorfCime'>RAM: </h2>
        <h2 className='megnev'>{adat.RamNeve} - {adat.RamMeret}GB</h2>
        {ramAdat && (
          <Link to="/oldalak/AlkatreszReszletek" state={{ 'tipus': ram, 'id': ramAdat }}>
            <button className='tovabbi'>További részletek</button>
          </Link>
        )}
      </div>

      <div className='sor'>
        <h2 className='sorfCime'>Operációs rendszer: </h2>
        <h2 className='megnev'>{adat.OprendszerNev}</h2>
        {oprendszer && (
          <Link to="/oldalak/AlkatreszReszletek" state={{ 'tipus': opre, 'id': oprendszer }}>
            <button className='tovabbi'>További részletek</button>
          </Link>
        )}
      </div>

      <div className='sor'>
        <h2 className='sorfCime'>Alaplap: </h2>
        <h2 className='megnev'>{adat.AlaplapNeve}</h2>
        {alaplap && (
          <Link to="/oldalak/AlkatreszReszletek" state={{ 'tipus': alap, 'id': alaplap }}>
            <button className='tovabbi'>További részletek</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Kovetelmeny;