import { useState, useEffect } from 'react';
import AlkReszletStilus from './AlkReszlet.css';
import { useLocation } from 'react-router-dom';
import Gorgeto from '../alkatreszek/Gorgeto';

function AlkatreszReszletek() {
  
  const location = useLocation();
  const info = location.state;

  var [Gorgi, setGorgi] = useState('');
  useEffect(() => {
    if (info['tipus'] === 'v') setGorgi(<Gorgeto tema='Videókártyák'></Gorgeto>);
    else if (info['tipus'] === 'p') setGorgi(<Gorgeto tema='Processzorok'></Gorgeto>);
    else if (info['tipus'] === 'r') setGorgi(<Gorgeto tema='RAM-ok'></Gorgeto>);
    else if (info['tipus'] === 'o') setGorgi(<Gorgeto tema='Operációsrendszerek'></Gorgeto>);
    else if (info['tipus'] === 'a') setGorgi(<Gorgeto tema='Alaplapok'></Gorgeto>);
  }, [info]);

  const [Mind, setMind] = useState([]); 
  const [betoltve, setBetoltve] = useState(false);

  const kulcsModosito = {
    'Nev': 'Név',
    'alaplapiCsatlakozas': 'Alaplapi Csatlakozás',
    'ajanlottTapegyseg': 'Ajánlott Tápegység',
    'monitorCsatlakozas': 'Monitor Csatlakozás',
    'chipGyartoja': 'Chip Gyártója',
    'vram': 'VRAM',
    'AlaplapFoglalat': 'Alaplap Foglalat',
    'SzalakSzama': 'Szálak Száma',
    'TamogatottMemoriatipus': 'Támogatott Memóriatípus',
    'ProcesszormagokSzama': 'Processzormagok Száma',
    'ProcesszorFrekvencia': 'Processzor Frekvencia',
    'BProcesszorFrekvencia': 'B Processzor Frekvencia',
    'Gyarto': 'Gyártó',
    'IntegraltVideokartya': 'Integrált Videókártya',
    'MemoriaTipus': 'Memória Típus',
    'Meret': 'Méret',
    'BuildSzam': 'Build Szám',
    'Verzio': 'Verzió',
    'CpuFoglalat': 'CPU Foglalat',
    'AlaplapFormatum': 'Alaplap Formátum',
    'MaxFrekvencia': 'Maximális Frekvencia',
    'MemoriaTipusa': 'Memória Típusa',
    'Lapkakeszlet': 'Lapkakészlet',
    'SlotSzam': 'Slot Szám',
    'Hangkartya': 'Hangkártya',
    'VideokartyaCsatlakozo': 'Videókártya Csatlakozó'
  };

  useEffect(() => {
    elemekBetoltese();
  }, []);

  function elemekBetoltese() {
    let ujMind = []; 
    for (let sor in info['id']) {
      const kiirando = kulcsModosito[sor] || sor;

      let ertek = info['id'][sor];
      if (ertek == false) ertek = 'Nincs';
      else if (ertek == true) ertek = 'Van';

      if(! ((sor == 'Kepnev') || sor == 'KepNev')){
        ujMind.push(
          <div className="sor" key={sor}>
            <h2 className="elemNev">{kiirando + ':'}</h2>
            <h2 className="elemErtek">{ertek}</h2>
          </div>
        );
      }
    }

    setMind(ujMind);
    setBetoltve(true);
  }
  
  return (
    <div className="teljes">
      <h1 className="tipCim">{info['id'].Nev}</h1>
      <div className="conti">
        {betoltve ? Mind : <p>Betöltés folyamatban!</p>}
      </div>
      {Gorgi}
    </div>
  );
}

export default AlkatreszReszletek;
