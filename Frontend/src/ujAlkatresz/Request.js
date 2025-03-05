export function RequestVideokP(fileUrl){
    var nevElem = document.getElementById('VideoPost1').value;
    var aCsatlakozasElem = document.getElementById('VideoPost2').value;
    var atapegysegElem = document.getElementById('VideoPost3').value;
    var mCsatlakozasElem = document.getElementById('VideoPost4').value;
    var vramElem = document.getElementById('VideoPost5').value;
    var cGyartoElem = document.getElementById('VideoPost6').value;

    var kepneve=String(fileUrl);
    console.log(kepneve);
    console.log(nevElem);
    console.log(aCsatlakozasElem);
    console.log(atapegysegElem);
    console.log(mCsatlakozasElem);
    console.log(vramElem);
    console.log(cGyartoElem);

    
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
    var selectCsatlakozokElem = document.getElementById('AlaplapPost8');
    var selectKivalaszottCsat=Array.from(selectCsatlakozokElem.selectedOptions).map(option => option.value);
    const Hangkartya=document.querySelector('input[name="hgk_true"]:checked').value;
    var kepneve=String(fileUrl);
    console.log(kepneve);
    console.log(selectKivalaszottCsat);

    
    if (aNevElem!=null || processzorFoglalatElem!=null || alaplapFormatumElem!=null || maxFrekvenciaElem!=null || memoriaTipusElem!=null || lapkaKeszletElem!=null || slotSzamElem!=null) 
        {
            fetch ("https://localhost:44316/api/Alaplap", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Nev: aNevElem,
                    CpuFoglalat: processzorFoglalatElem,
                    AlaplapFormatum: alaplapFormatumElem,
                    MaxFrekvencia: parseInt(maxFrekvenciaElem),
                    MemoriaTipusa: memoriaTipusElem,
                    Lapkakeszlet: lapkaKeszletElem,
                    SlotSzam:parseInt(slotSzamElem),
                    Hangkartya: Hangkartya,
                    VideokartyaCsatlakozo: "string",
                    Csatlakozok: selectKivalaszottCsat,
                    KepNev: kepneve,
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
                    Nev: mNevElem,
                    MemoriaTipus:memoriaTipusElem,
                    Frekvencia: parseInt(frekvenciaElem),
                    Meret:parseInt(meretElem),
                    Kepnev: kepneve,
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
    var bFrekvenciaElem = document.getElementById('ProcPost3').value;
    var alaplapFoglalatElem = document.getElementById('ProcPost4').value;
    var szalakSzamaElem = document.getElementById('ProcPost5').value;
    var tamogatottMemoriaTipusElem = document.getElementById('ProcPost6').value;
    var processzormagokSzamaElem = document.getElementById('ProcPost7').value;
    var gyartoElem = document.getElementById('ProcPost8').value;
    var ajanlottTapegysegElem = document.getElementById('ProcPost9').value;
    const integraltVideokartya = document.querySelector('input[name="ivk_true"]:checked').value;
    var kepneve=String(fileUrl);
    console.log(kepneve)


    
    if (pNevElem!=null || frekvenciaElem!=null || bFrekvenciaElem!=null || alaplapFoglalatElem!=null || szalakSzamaElem!=null || tamogatottMemoriaTipusElem!=null || processzormagokSzamaElem!=null || gyartoElem!=null || ajanlottTapegysegElem!=null) 
        {
            fetch ("https://localhost:44316/api/Processzor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Nev: pNevElem,
                    AlaplapFoglalat: alaplapFoglalatElem,
                    SzalakSzama: parseInt(szalakSzamaElem),
                    TamogatottMemoriatipus: tamogatottMemoriaTipusElem,
                    ProcesszormagokSzama: parseInt(processzormagokSzamaElem),
                    ProcesszorFrekvencia: parseFloat(frekvenciaElem),
                    BProcesszorFrekvencia: parseFloat(bFrekvenciaElem),     
                    Gyarto:gyartoElem,
                    AjanlottTapegyseg:parseInt(ajanlottTapegysegElem),
                    IntegraltVideokartya: integraltVideokartya,
                    Kepnev: kepneve,
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
//------------PATCH/PUT----------------------------------------------
export function RequestVideokPatch(fileName, videokName, vram,)
{
    var aCsatlakozasElem = document.getElementById('VideokPatch1').value;
    var atapegysegElem = document.getElementById('VideokPatch2').value;
    var mCsatlakozasElem = document.getElementById('VideokPatch3').value;  
    var cGyartoElem = document.getElementById('VideokPatch4').value;
    //var aHangkartya=document.querySelector('input[name="AlaplapPatch7"]:checked').value;
    var kepneve=String(fileName);

    const neLegyenWhiteSpace=/[a-zA-z0-9]/;

    if(atapegysegElem=="" || neLegyenWhiteSpace.test(atapegysegElem))atapegysegElem=null;
    if(mCsatlakozasElem=="" || neLegyenWhiteSpace.test(mCsatlakozasElem))mCsatlakozasElem=null;
    if(cGyartoElem=="" || neLegyenWhiteSpace.test(cGyartoElem))cGyartoElem=null;
    if(kepneve=="")kepneve=null;


        fetch (`https://localhost:44316/api/Videokartya/0?name=${videokName}&vram=${vram}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                alaplapiCsatlakozas: aCsatlakozasElem,
                ajanlottTapegyseg: parseInt(atapegysegElem),
                monitorCsatlakozas: mCsatlakozasElem,
                chipGyartoja: cGyartoElem,
                //Hangkartya : aHangkartya,
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
export function RequestAlaplapPatch(fileName, alaplapnev)
{
    var processzorFoglalat = document.getElementById('AlaplapPatch1').value;
    var alaplapFormatum = document.getElementById('AlaplapPatch2').value;
    var maxFrekvencia = document.getElementById('AlaplapPatch3').value;  
    var memoriaTipus = document.getElementById('AlaplapPatch4').value;
    var lapkakeszlet=document.getElementById('AlaplapPatch5').value;
    var slotSzam=document.getElementById('AlaplapPatch6').value;
    var kepneve=String(fileName);

    const neLegyenWhiteSpace=/[a-zA-z0-9]/;
    if(processzorFoglalat=="" || neLegyenWhiteSpace.test(processzorFoglalat))processzorFoglalat=null;
    if(alaplapFormatum=="" || neLegyenWhiteSpace.test(alaplapFormatum))alaplapFormatum=null;
    if(maxFrekvencia=="")maxFrekvencia=null;
    if(memoriaTipus=="" || neLegyenWhiteSpace.test(memoriaTipus))memoriaTipus=null;
    if(lapkakeszlet=="" || neLegyenWhiteSpace.test(lapkakeszlet))lapkakeszlet=null;
    if(slotSzam=="")slotSzam=null;
    if(kepneve=="")kepneve=null;

// Itt kell még vmit csinálni?
        fetch (`https://localhost:44316/api/Alaplap/0?name=${alaplapnev}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                CpuFoglalat: processzorFoglalat,
                AlaplapFormatum: alaplapFormatum,
                MaxFrekvencia: parseInt(maxFrekvencia),
                MemoriaTipusa: memoriaTipus,
                Lapkakeszlet: lapkakeszlet,
                SlotSzam: slotSzam,
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
