import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KontaktStilus from './Kontact.css';

function KontaktComp() {
    const [Mi, setMi] = useState([]);

    var sajatAdatok = [
        {
            Nev: 'Hegedüs Janka',
            KepEleres: 'enVagyok.png',
            InstaNev: 'jankaaa_hegedusss',
            InstaLink: 'https://www.instagram.com/jankaaa_hegedusss/'
        },
        {
            Nev: 'Szabó Máté',
            KepEleres: 'profil.hiany.jpg',
            Insta: '',
            InstaLink: ''
        },
        {
            Nev: 'Salamon Szindi',
            KepEleres: 'profil.hiany.jpg',
            Insta: '',
            InstaLink: ''
        }
    ]

    function MiBetoltesunk(){
        let ujMind=[];
        for(let elem of sajatAdatok){
            ujMind.push(
                <div key={elem.Nev} className='miKeret'>
                    <div className='miNev'>{elem.Nev}</div>
                    <img src={`/IMAGE/${elem.KepEleres}`} className='miProfil'></img>
                    <div className='instaSor'>
                        <img src='https://img.icons8.com/?size=100&id=32309&format=png&color=000000' className='instaLogo'></img>
                        <Link to={elem.InstaLink}><div className='instaNev'>{elem.InstaNev}</div></Link>
                    </div>
                </div>
            )
        }

        setMi(ujMind);
    }
    useEffect(() => MiBetoltesunk(), []);

  return (
    <div>
      <div className='kontaktFocim'>Készítők</div>
      <div className='miCont'>
        {Mi}
      </div>
      
    </div>
  );
}

export default KontaktComp;