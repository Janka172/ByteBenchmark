import React from "react";
import { useState,useEffect } from "react";
import {setAlertVisszahiv} from "./alertService.js";
import './egyediAlertDesign.css';

export default function EgyediAlert(){

    const [actionMegnyitva, setActionMegnyitva] = useState(false);
    const [message, setMessage] = useState("");
    const [errorList, setErrorList] = useState([]);
    const [sikeres, setSikeres] = useState(false);


    useEffect(() => {
        setAlertVisszahiv((uzenet, errors, sikerese) => {
            console.log('CustomAlert kapott:', uzenet, errors, sikerese);
            setMessage(uzenet);
            setErrorList(errors);
            setSikeres(sikerese);
            setActionMegnyitva(true);
        });
    },[])

    const handleClose = () => {
        setActionMegnyitva(false);
        setMessage("");
        setErrorList([]);
        setSikeres(false);
    }
    if(!actionMegnyitva){
        return null;
    }

    return (
        console.log(errorList),
        <div className="alert_kontener">
            <div className={`alertdoboz ${sikeres ? "sikeres" : "hiba"}`}>
                <p id="hibafejlec">{sikeres? "Sikeres a művelet!":"Hiba történt a folyamat közben!"}</p>
                {errorList.length > 0 && (
                    <div className="alert_hiba_lista">
                        <p id="hibacim">Hibák:</p>
                        <ul>
                            {errorList.map((hiba, index) => (
                                <li key={index}>{hiba}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={()=>handleClose()}>Bezár</button>
            </div>
        </div>
    );
}