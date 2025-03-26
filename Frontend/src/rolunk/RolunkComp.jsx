import { useState } from 'react';
import RolunkStilus from './Rolunk.css';

function RolunkComp() {

  return (
    <div>
        <div className='rolunkFocim'>Mi is a ByteBenchmark ?</div>

        <div className='rolunkAlcim'>Miért készült el ez az oldal ?</div>
        <div className='rolunkSzoveg'>
            Felmerült bennünk az az igény, hogy különböző játékok, és egyéb programok gépigényét egy könnyen kezelhető, egységes felületen tudjuk felmérni. Az, hogy ne csak játékotat, hanem egyéb szoftverek is tudjunk azok gépigénye szerint besorolni.<br/>
            Kevés gépigényekkel foglalkozó weboldal, és vagy program van jelenleg piacon. Ezek többsége nem naprakész adatokkal dolgozik, vagy a fejlesztésük megrekedt, nem kerül frissítésre az új alkalmazásokkal.<br/>
            Vannak olyan hasonló oldalak is továbbá, amik hiányos, vagy nem megfelelő adatokkal dolgoznak ezzel félrevezetve a felhasználókat.<br/>
            Szoftverünk továbbá képes különböző hardver kompatibilitásának vizsgálatára is, ezzel segítve egy az informatikában nem feltétlen jártas személy számára is az egymással kompatibilis alkatrészek kiválasztását.
        </div>

        <div className='rolunkAlcim'>Mi a célunk ?</div>
        <div className='rolunkSzoveg'>
            A felhasználó egy webes felületen használhatja a programot, ehhez egy asztali alkalmazás nyújt adminisztrációs lehetőségeket.<br/>
            Lehetőséget ad arra, hogy egy program gépigényének felmérésére meg kelljen vásárolni azt, ezzel pénzt spórolva a felhasználó számára. Segít abban is, hogy könnyen találjuk meg az igényeinknek megfelelő alkalmazást, ezzel időt megtakarítva a hosszas böngészéssel szemben.<br/>
            Továbbá segíti azon felhasználók számára is, akik nem jártasak az informatika terén, és nehezen találják meg a gépükhöz szükséges, és egymással kompatibilis hardver eszközöket. Nekik fontos lehet az, hogy könnyebben tudják kiválasztani a számukra megfelelő hardvereket, és ellenőrizhessék azok kompatibilitását, ezzel elkerülve azt, hogy esetlegesen egymással nem kompatibilis eszközöket vásároljanak meg.
        </div>
    </div>
  );
}

export default RolunkComp;
