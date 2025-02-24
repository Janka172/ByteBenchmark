
export function RequestVideokP(fileUrl){
    var nevElem = document.getElementById('VideoPost1').value;
    var aCsatlakozasElem = document.getElementById('VideoPost2').value;
    var atapegysegElem = document.getElementById('VideoPost3').value;
    var mCsatlakozasElem = document.getElementById('VideoPost4').value;
    var cGyartoElem = document.getElementById('VideoPost5').value;
    var vramElem = document.getElementById('VideoPost6').value;
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
            }).then(response => response.json())
            .then(data => console.log("Siker:", data))
            .then(error=>{
                if (!error.ok)
                {
                    alert("HTTP hiba")
                }
                else( alert("Sikeres feltöltés"))
            })
            .catch(error => console.error("Hiba történt:", error));
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
