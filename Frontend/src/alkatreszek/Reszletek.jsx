import { useState, useEffect } from 'react';

function Reszletek({ adat }) {
  var [Mind, setMind] = useState([]);
  var [betoltve, setBetoltve] = useState(false);

  useEffect(() => {
    elemekBetoltese();
  }, [adat]);

  function elemekBetoltese() {
    let ujMind = []; 
    for (let sor in adat) {
      var kiirando=sor;
      let mertekegyseg='';

      if(adat[sor] == false) adat[sor]='Nincs';
      else if(adat[sor] == true) adat[sor]='Van';

      if(sor == 'Nev') kiirando = 'Név';
      else if(sor == 'alaplapiCsatlakozas') kiirando = 'Alaplai Csatlakozás';
      else if(sor == 'ajanlottTapegyseg') kiirando = 'Ajánlott Tápegység';
      else if(sor == 'monitorCsatlakozas') kiirando = 'Monitor Csatlakozás';
      else if(sor == 'chipGyartoja') kiirando = 'Chip Gyártója';
      else if(sor == 'vram') {
        kiirando = 'VRAM';
        mertekegyseg ='GB';
      }
      else if(sor == 'AlaplapFoglalat') kiirando = 'Alaplap Foglalat';
      else if(sor == 'SzalakSzama') kiirando = 'Szálak Száma';
      else if(sor == 'TamogatottMemoriatipus') kiirando = 'Támogatott Memóriatípus';
      else if(sor == 'ProcesszormagokSzama') kiirando = 'Processzormagok Száma';
      else if(sor == 'ProcesszorFrekvencia') {
        kiirando = 'Processzor Frekvencia';
        mertekegyseg = 'Hz';
      }
      else if(sor == 'BProcesszorFrekvencia') {
        kiirando = 'B Processzor Frekvencia';
        mertekegyseg = 'Hz';
      }
      else if(sor == 'Gyarto') kiirando = 'Gyártó';
      else if(sor == 'AjanlottTapegyseg') kiirando = 'Ajánlott Tápegyseg';
      else if(sor == 'IntegraltVideokartya') kiirando = 'IntegráltVideokártya';
      else if(sor == 'MemoriaTipus') kiirando = 'Memoria Tipus';
      else if(sor == 'Meret') {
        kiirando = 'Méret';
        mertekegyseg = 'GB';
      }
      else if(sor == 'BuildSzam') kiirando = 'Build Szám';
      else if(sor == 'Verzio') kiirando = 'Verzió';
      else if(sor == 'CpuFoglalat') kiirando = 'Cpu Foglalat';
      else if(sor == 'AlaplapFormatum') kiirando = 'Alaplap Formátum';
      else if(sor == 'MaxFrekvencia') {
        kiirando = 'Maximális Frekvencia';
        mertekegyseg = 'Hz';
      }
      else if(sor == 'MemoriaTipusa') kiirando = 'Memoria Típusa';
      else if(sor == 'Lapkakeszlet') kiirando = 'Lapkakészlet';
      else if(sor == 'SlotSzam') kiirando = 'Slot Szám';
      else if(sor == 'Hangkartya') kiirando = 'Hangkártya';
      else if(sor == 'VideokartyaCsatlakozo') kiirando = 'Videókártya Csatlakozó';
      else if(sor == 'Frekvencia') mertekegyseg = 'Hz';

      if(! ((sor == 'KepNev') || (sor == 'Kepnev') || (sor == 'kepnev'))){
        ujMind.push(
          <div className="sor" key={sor}>
            <h2 className="elemNev">{kiirando + ':'}</h2>
            <h2 className="elemErtek">{adat[sor]} {mertekegyseg}</h2>
          </div>
        );
      }
    }
    
    setMind(ujMind);
    setBetoltve(true);
  }

  return (
    <div className="conti teljesReszletMenu">
      {betoltve ? Mind.map((x) => x) : <p>Betöltés folyamatban!</p>}
    </div>
  );
}

export default Reszletek;
