import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlkikStilus from './Alkik.css';

function Alkik(){
    var atmenetiKepLink = '/kepek/kep.png';

    const [mindenApp, setMindenApp] = useState([]);
    const [betoltA, setBetoltA] = useState(true);
    const [randomIndexek, setRandomIndexek] = useState([]);
    const [betoltAlk, setBetoltAlk] = useState(true);

    async function getMindenApp() {
        try {
            const response = await fetch('https://localhost:44316/api/Applikacio');
            const data = await response.json();
            setMindenApp(data);
            setBetoltA(false);
            const szamok = indexekEloallitasa(data.length, 4);
            setRandomIndexek(szamok);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getMindenApp();
    }, []);
    
    function indexekEloallitasa(hossz, db) {
        const randomIndexek = [];

        if(hossz<db) db=hossz;

        while (randomIndexek.length < db) {
            const randomIndex = Math.floor(Math.random() * hossz);
            if (!randomIndexek.includes(randomIndex)) {
                randomIndexek.push(randomIndex);
            }
        }
        return randomIndexek;
    }

    useEffect(() => {
        if(!betoltA) appokMegjelenitese();
    }, [randomIndexek]);

    var [alkCont, setAlkCont] = useState([]);

    function appokMegjelenitese() {
        const ujAlkCont = [];
        for (let i = 0; i < 4 && i < randomIndexek.length; i++) {
            ujAlkCont.push(
                <Link key={i} to='/oldalak/AlkalmazasReszletek' state={{'nev' : mindenApp[randomIndexek[i]].Nev}}>
                    <div className="kezdoKepKeret">
                        <img src={atmenetiKepLink} className="kisKep" alt="App" />
                        <h4 className="kezd">{ mindenApp[randomIndexek[i]].Nev}</h4>
                    </div>
                </Link>
            );
        }

        setAlkCont(ujAlkCont);
        setBetoltAlk(false);
    }


    return (
        <div className='alkContainer'>
            {betoltAlk ? console.log('Betöltés folyamatban !') : alkCont.map(x => x)}
        </div>
      );
}

export default Alkik;