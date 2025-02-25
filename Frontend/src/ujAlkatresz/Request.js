
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

}

export function RequestMemoriaP(fileUrl){
    
}

export function RequestProcesszorP(fileUrl){
    
}
