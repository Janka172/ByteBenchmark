/*
export function RequestVideokP(fileUrl){
    var nevElem = document.getElementById('VideoPost1').value;
    var aCsatlakozasElem = document.getElementById('VideoPost2').value;
    var atapegysegElem = document.getElementById('VideoPost3').value;
    var mCsatlakozasElem = document.getElementById('VideoPost4').value;
    var cGyartoElem = document.getElementById('VideoPost6').value;
    var vramElem = document.getElementById('VideoPost5').value;
    var kepneve=String(fileUrl);
    console.log(kepneve)

    
    if (nevElem!=null || aCsatlakozasElem!=null || atapegysegElem!=null || mCsatlakozasElem!=null || cGyartoElem!=null || vramElem!=null) 
        {
            fetch ("https://localhost:44316/api/Videokartya", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Nev: nevElem,
                    alaplapiCsatlakozas: aCsatlakozasElem,
                    ajanlottTapegyseg: parseInt(atapegysegElem),
                    monitorCsatlakozas: mCsatlakozasElem,
                    chipGyartoja: cGyartoElem,
                    vram: parseInt(vramElem),
                    kepnev: kepneve,
                }),
            })
            .then((response) => {
                console.log(response.status)
                if (!response.ok) {
                    //409
                    if(response.status === 409){
                        alert("Ez a videokártya már szerepel ezzel a vram konfigurácioval.")
                    }
                    else{
                        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                    }
                }
                else alert("Sikeres feltöltés!");
                
                return response.json()
            })
            .catch((error) => {
                console.error("Hiba történt:", error)
                alert("Server hiba. Kérlek próbált meg később!");
            });
        }
        else
        {
            alert("kuka")
        }

}

export function RequestAlaplapP(fileUrl){
    var aNevElem = document.getElementById('AlaplapPost1').value;
    var processzorFoglalatElem = document.getElementById('AlaplapPost2').value;
    var alaplapFormatumElem = document.getElementById('AlaplapPost3').value;
    var maxFrekvenciaElem = document.getElementById('AlaplapPost4').value;
    var memoriaTipusElem = document.getElementById('AlaplapPost5').value;
    var lapkaKeszletElem = document.getElementById('AlaplapPost6').value;
    var slotSzamElem = document.getElementById('AlaplapPost7').value;
    // var hangKartyatElem = document.getElementById('AlaplapPost7').value;             ez hogy lesz megoldva????
    var kepneve=String(fileUrl);
    console.log(kepneve)

    
    if (aNevElem!=null || processzorFoglalatElem!=null || alaplapFormatumElem!=null || maxFrekvenciaElem!=null || memoriaTipusElem!=null || lapkaKeszletElem!=null || slotSzamElem!=null) 
        {
            fetch ("https://localhost:44316/api/Alaplap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    aNev: nevElem,
                    processzorFoglalat: aCsatlakozasElem,
                    alaplapFormatum: parseInt(atapegysegElem),
                    maxFrekvencia: mCsatlakozasElem,
                    memoriaTipus: cGyartoElem,
                    lapkaKeszlet: parseInt(vramElem),
                    slotSzam:parseInt(slotSzamElem),
                    kepnev: kepneve,
                }),
            })
            .then((response) => {
                console.log(response.status)
                if (!response.ok) {
                    //409
                    if(response.status === 409){
                        alert("Ez az alaplap már szerepel ezzel a konfigurácioval.")
                    }
                    else{
                        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                    }
                }
                else alert("Sikeres feltöltés!");
                
                return response.json()
            })
            .catch((error) => {
                console.error("Hiba történt:", error)
                alert("Server hiba. Kérlek próbált meg később!");
            });
        }
        else
        {
            alert("kuka")
        }

}

export function RequestMemoriaP(fileUrl){
    var mNevElem = document.getElementById('MemoriaPost1').value;
    var memoriaTipusElem = document.getElementById('MemoriaPost2').value;
    var frekvenciaElem = document.getElementById('MemoriaPost3').value;
    var meretElem = document.getElementById('MemoriaPost4').value;
    var kepneve=String(fileUrl);
    console.log(kepneve)

    
    if (mNevElem!=null || memoriaTipusElem!=null || frekvenciaElem!=null || meretElem!=null) 
        {
            fetch ("https://localhost:44316/api/Ram", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mNev: mNevElem,
                    memoriaTipus:memoriaTipusElem,
                    frekvencia: parseInt(frekvenciaElem),
                    meret:parseInt(meretElem),
                    kepnev: kepneve,
                }),
            })
            .then((response) => {
                console.log(response.status)
                if (!response.ok) {
                    //409
                    if(response.status === 409){
                        alert("Ez a memória már szerepel ezzel a konfigurácioval.")
                    }
                    else{
                        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                    }
                }
                else alert("Sikeres feltöltés!");
                
                return response.json()
            })
            .catch((error) => {
                console.error("Hiba történt:", error)
                alert("Server hiba. Kérlek próbált meg később!");
            });
        }
        else
        {
            alert("kuka")
        }
    
}

export function RequestProcesszorP(fileUrl){
    var pNevElem = document.getElementById('ProcPost1').value;
    var frekvenciaElem = document.getElementById('ProcPost2').value;
    var alaplapFoglalatElem = document.getElementById('ProcPost3').value;
    var szalakSzamaElem = document.getElementById('ProcPost4').value;
    var tamogatottMemoriaTipusElem = document.getElementById('ProcPost5').value;
    var processzormagokSzamaElem = document.getElementById('ProcPost6').value;
    var gyartoElem = document.getElementById('ProcPost7').value;
    var ajanlottTapegysegElem = document.getElementById('ProcPost8').value;
    // var integraltVideokartyaElem = document.getElementById('AlaplapPost9').value;             ez hogy lesz megoldva????
    var kepneve=String(fileUrl);
    console.log(kepneve)

    
    if (pNevElem!=null || frekvenciaElem!=null || alaplapFoglalatElem!=null || szalakSzamaElem!=null || tamogatottMemoriaTipusElem!=null || processzormagokSzamaElem!=null || gyartoElem!=null || ajanlottTapegysegElem!=null) 
        {
            fetch ("https://localhost:44316/api/Processzor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pNev: pNevElem,
                    frekvencia: parseInt(frekvenciaElem),
                    alaplapFogalalat: alaplapFoglalatElem,
                    szalakSzama: parseInt(szalakSzamaElem),
                    tamogatottMemoriaTipus: tamogatottMemoriaTipusElem,
                    processzormagokSzama: parseInt(processzormagokSzamaElem),
                    gyarto:gyartoElem,
                    ajanlottTapegyseg:parseInt(ajanlottTapegysegElem),
                    kepnev: kepneve,
                }),
            })
            .then((response) => {
                console.log(response.status)
                if (!response.ok) {
                    //409
                    if(response.status === 409){
                        alert("Ez az processzor már szerepel ezzel a konfigurácioval.")
                    }
                    else{
                        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                    }
                }
                else alert("Sikeres feltöltés!");
                
                return response.json()
            })
            .catch((error) => {
                console.error("Hiba történt:", error)
                alert("Server hiba. Kérlek próbált meg később!");
            });
        }
        else
        {
            alert("kuka")
        }

    
}
*/