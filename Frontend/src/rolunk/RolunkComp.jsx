import { useState } from 'react';
import RolunkStilus from './Rolunk.css';

function RolunkComp() {
  const [miertDisp, setMiertDisp] = useState('none');
  const [celDisp, setCelDisp] = useState('none');


  function miertLenyitas(){
    if(miertDisp == 'none') setMiertDisp('grid');
    else setMiertDisp('none');
  }

  function celLenyitas(){
    if(celDisp == 'none') setCelDisp('grid');
    else setCelDisp('none');
  }

  return (
    <div>
        <div className='rolunkFocim'>Mi is a ByteBenchmark ?</div>

        <div className='rolunkAlcim' onClick={miertLenyitas}>Miért készült el ez az oldal ?</div>
        <div className='rolunkSzoveg' style={{ display: miertDisp }}>
          Felmerült bennünk az az igény, hogy különböző játékok, és egyéb programok gépigényét egy könnyen kezelhető, egységes  felületetudjuk felmérni. Az, hogy ne csak játékotat, hanem egyéb szoftverek is tudjunk azok gépigénye szerint besorolni.<br/>
          Kevés gépigényekkel foglalkozó weboldal, és vagy program van jelenleg piacon. Ezek többsége nem naprakész adatokkal dolgozikvagy a  fejlesztésük megrekedt, nem kerül frissítésre az új alkalmazásokkal.<br/>
          Vannak olyan hasonló oldalak is továbbá, amik hiányos, vagy nem megfelelő adatokkal dolgoznak ezzel félrevezetve felhasználókat <br/>
          Szoftverünk továbbá képes különböző hardver kompatibilitásának vizsgálatára is, ezzel segítve egy az informatikában nefeltétlen jártas személy számára is az egymással kompatibilis alkatrészek kiválasztását.
        </div>

        <div className='rolunkAlcim' onClick={celLenyitas}>Mi a célunk ?</div>
        <div className='rolunkSzoveg' style={{ display: celDisp }}>
          A célunk, hogy a felhasználó egy webebes felület segítségével könnyedén minimális idő, és energia befeketéssel tudja megtalálni a számára szükséges információkat, egy általa keresett programról, vagy hardverről.<br/>
          Az oldal lehetőséget biztosít arra, hogy egy program gépigényének felméréséhez ne kelljen megvásárolni a software-t, ezzel a felhasználó pénzt tudjon spórolni. Továbbá segít abban is, hogy a felhasználó a lehető legkevesebb idő alatt, találja meg az igényeiknek megfelelő alkalmazást.<br/>
          Továbbá segíti azon felhasználók számára is, akik egy új számítógép összeállítása előtt áll-nak, és nem jártassak az informatika terén, ezáltal nehezen találják meg a gépükhöz szüksé-ges, és egymással kompatibilis hardver eszközöket. Erre nyújt megoldást a mi programunk, hiszen a hardver kompatibilitást is könnyedén leellenőrizheti. Nekik fontos lehet az, hogy könnyebben tudják kiválasztani a számukra megfelelő hardvereket, és ellenőrizhessék azok kompatibilitását, ezzel elkerülve azt, hogy esetlegesen egymással nem kompatibilis eszkö-zöket vásároljanak meg.<br/>
          Valamint az is a céljaink közé tartozik, hogy az oldal folyamatos karbantartásának segítség-ével állandóan naprakész információval szolgálni a felhasználóink számára, ezzel megköny-nyítve számukra a pontos információk megtalálását. Ezt elősegíti egy könnyen használható kezelőfelület.<br/>
          Ezen felül fontosnak tartjuk, azt is, hogy az oldal könnyen karbantartható legyen, és lehető-séget adjon továbbfejlesztési lehetőségekre is.
        </div>
    </div>
  );
}

export default RolunkComp;
