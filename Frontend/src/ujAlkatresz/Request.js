
export function RequestVideoK(fileUrl){
    var nevElem = document.getElementById('1');
    var aCsatlakozasElem = document.getElementById('2');
    var atapegysegElem = document.getElementById('3');
    var mCsatlakozasElem = document.getElementById('4');
    var cGyartoElem = document.getElementById('6');
    var vramElem = document.getElementById('5');
    var kepneve=String(fileUrl);
    console.log(kepneve)

    // Ellenőrizzük, hogy az input mezők valóban léteznek-e
    if (!nevElem || !aCsatlakozasElem || !atapegysegElem || !mCsatlakozasElem || !cGyartoElem || !vramElem) {
        console.error("Hiba: Nem található egy vagy több input mező!");
        return;
    }

    var nev = nevElem.value;
    var aCsatlakozas = aCsatlakozasElem.value;
    var atapegyseg = atapegysegElem.value;
    var mCsatlakozas = mCsatlakozasElem.value;
    var cGyarto = cGyartoElem.value;
    var vram = vramElem.value;

    fetch ("https://localhost:44316/api/Videokartya", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Nev: nev,
            alaplapiCsatlakozas: aCsatlakozas,
            ajanlottTapegyseg: parseInt(atapegyseg),
            monitorCsatlakozas: mCsatlakozas,
            chipGyartoja: cGyarto,
            vram: parseInt(vram),
            kepnev: kepneve,
        }),
    }).then(response => response.json())
    .then(data => console.log("Siker:", data))
    .catch(error => console.error("Hiba történt:", error));
}
