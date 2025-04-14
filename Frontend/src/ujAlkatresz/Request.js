import {addHiba,showHiba} from '../Alert/alertService.js'

var errors=[];

export function RequestVideokP(fileUrl){
    errors.length=0;
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

    const neLegyenWhiteSpace=/[a-zA-Z]/;
    if(nevElem==null)errors.push("Név nem lehet üres");
    if(!neLegyenWhiteSpace.test(nevElem))errors.push("A névnek tartalmaznia kell legalább egy betüt");
    if(aCsatlakozasElem==null)errors.push("Alaplap csatlakozás nem lehet üres");
    if(!neLegyenWhiteSpace.test(aCsatlakozasElem))errors.push("Alaplap csatlakozásnak tartalmaznia kell legalább egy betüt");
    if(atapegysegElem<4 || atapegysegElem>500)errors.push("Ajánlott tápegység mértéke nem lehet 4W-nál és 500W-nál nagyobb");
    if(mCsatlakozasElem==null)errors.push("Monitor csatlakozás nem lehet üres");
    if(!neLegyenWhiteSpace.test(mCsatlakozasElem))errors.push("Monitor csatlakozásnak tartalmaznia kell legalább egy betüt");
    if(cGyartoElem==null)errors.push("Chip gyártó nem lehet üres");
    if(!neLegyenWhiteSpace.test(cGyartoElem))errors.push("Chip gyártónak tartalmaznia kell legalább egy betüt");
    if(vramElem==null)errors.push("Vram nem lehet üres");
    if (errors.length == 0){ 
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
                        showHiba("Ez a videokártya már szerepel ezzel a vram konfigurácioval.",false);
                    }
                    else{
                        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                    }
                }
                else{
                    showHiba("Sikeres feltöltés!",true);
                    document.getElementById('VideoPost1').value="";
                    document.getElementById('VideoPost2').value="";
                    document.getElementById('VideoPost3').value="";
                    document.getElementById('VideoPost4').value="";
                    document.getElementById('VideoPost5').value="";
                    document.getElementById('VideoPost6').value="";
                }
                
                return response.json()
            })
            .catch((error) => {
                console.error("Hiba történt:", error)
                showHiba("Server hiba. Kérlek próbált meg később!",false);
            });
        }
    else
    {
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
        
    }

}

export function RequestAlaplapP(fileUrl){
    errors.length=0;
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

    const neLegyenWhiteSpace=/[a-zA-Z]/;

    if(aNevElem==null)errors.push("Név nem lehet üres");
    if(!neLegyenWhiteSpace.test(aNevElem))errors.push("A névnek tartalmaznia kell legalább egy betüt!");
    if(processzorFoglalatElem==null)errors.push("A processzorFoglalat nem lehet üres");
    if(!neLegyenWhiteSpace.test(processzorFoglalatElem))errors.push("A Proceszorfoglalatnak tartalmaznia kell legalább egy betüt!");
    if(alaplapFormatumElem==null)errors.push("Az alaplap formátum nem lehet üres");
    if(!neLegyenWhiteSpace.test(alaplapFormatumElem))errors.push("Az alaplapformátumnak tartalmazni kell legalább egy betüt");
    if(maxFrekvenciaElem<600 || maxFrekvenciaElem>5000)errors.push("A Frekvenciának 600Hz és 5000Hz között kell lenni");
    if(memoriaTipusElem==null)errors.push("A memoria tipus nem lehet üres");
    if(!neLegyenWhiteSpace.test(memoriaTipusElem))errors.push("A memoria tipusnak tartalmazni kell legalább egy betüt");
    if(lapkaKeszletElem==null)errors.push("A lapkakészlet nem lehet üres");
    if(!neLegyenWhiteSpace.test(lapkaKeszletElem))errors.push("A lapkakészletnek tartalmazni kell legalább egy betüt");
    if(slotSzamElem<1 || slotSzamElem>25)errors.push("A slotszám nem lehet kevesebb 1-nél illetve nem lehet több 25-nél")
    if (errors.length==0) 
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
                        showHiba("Ez az alaplap már szerepel ezzel a konfigurácioval.",false)
                    }
                    else{
                        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                    }
                }
                else{
                    showHiba("Sikeres feltöltés!",true);
                    document.getElementById('AlaplapPost1').value="";
                    document.getElementById('AlaplapPost2').value="";
                    document.getElementById('AlaplapPost3').value="";
                    document.getElementById('AlaplapPost4').value="";
                    document.getElementById('AlaplapPost5').value="";
                    document.getElementById('AlaplapPost6').value="";
                    document.getElementById('AlaplapPost7').value="";
                    document.getElementById('AlaplapPost8').value="";
                }
                
                return response.json()
            })
            .catch((error) => {
                console.error("Hiba történt:", error)
                showHiba("Server hiba. Kérlek próbált meg később!",false);
            });
        }
        else
        {
            errors.forEach((error)=>{
                addHiba(error);
                console.log(error);
            });
            showHiba("Hiba történt",false);
            errors.length = 0;
        }

}

export function RequestMemoriaP(fileUrl){
    var mNevElem = document.getElementById('MemoriaPost1').value;
    var memoriaTipusElem = document.getElementById('MemoriaPost2').value;
    var frekvenciaElem = document.getElementById('MemoriaPost3').value;
    var meretElem = document.getElementById('MemoriaPost4').value;
    var kepneve=String(fileUrl);
    console.log(kepneve)

    const neLegyenWhiteSpace=/[a-zA-Z]/;
    if (mNevElem!=null || neLegyenWhiteSpace.test(mNevElem) || memoriaTipusElem!=null || neLegyenWhiteSpace.test(memoriaTipusElem)|| frekvenciaElem!=null || meretElem!=null) 
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
                else{
                    alert("Sikeres feltöltés!");
                    document.getElementById('MemoriaPost1').value=""
                    document.getElementById('MemoriaPost2').value=""
                    document.getElementById('MemoriaPost3').value=""
                    document.getElementById('MemoriaPost4').value=""
                }
                
                return response.json()
            })
            .catch((error) => {
                console.error("Hiba történt:", error)
                alert("Server hiba. Kérlek próbált meg később!");
            });
        }
        else
        {
            errors.forEach((error)=>{
                addHiba(error);
                console.log(error);
            });
            showHiba("Hiba történt",false);
            errors.length = 0;
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

    const neLegyenWhiteSpace=/[a-zA-Z]/;
    
    if (pNevElem!=null || neLegyenWhiteSpace.test(pNevElem)||frekvenciaElem!=null || bFrekvenciaElem!=null || alaplapFoglalatElem!=null || neLegyenWhiteSpace.test(alaplapFoglalatElem) || szalakSzamaElem!=null || tamogatottMemoriaTipusElem!=null|| neLegyenWhiteSpace.test(tamogatottMemoriaTipusElem) || processzormagokSzamaElem!=null || gyartoElem!=null|| neLegyenWhiteSpace.test(gyartoElem) || ajanlottTapegysegElem!=null) 
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
                else{
                    alert("Sikeres feltöltés!");
                    document.getElementById('ProcPost1').value="";
                    document.getElementById('ProcPost2').value="";
                    document.getElementById('ProcPost3').value="";
                    document.getElementById('ProcPost4').value="";
                    document.getElementById('ProcPost5').value="";
                    document.getElementById('ProcPost6').value="";
                    document.getElementById('ProcPost7').value="";
                    document.getElementById('ProcPost8').value="";
                    document.getElementById('ProcPost9').value="";
                }
                
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
//------------PATCH----------------------------------------------
export function RequestVideokPatch(fileName, videokName, vram,)
{
    var aCsatlakozasElem = document.getElementById('VideokPatch1').value;
    var atapegysegElem = document.getElementById('VideokPatch2').value;
    var mCsatlakozasElem = document.getElementById('VideokPatch3').value;  
    var cGyartoElem = document.getElementById('VideokPatch4').value;
    var kepneve=String(fileName);

    const neLegyenWhiteSpace=/[a-zA-Z]/;
    if(aCsatlakozasElem=="" || !neLegyenWhiteSpace.test(aCsatlakozasElem))aCsatlakozasElem=null;
    if(atapegysegElem==0)atapegysegElem=null;
    if(mCsatlakozasElem=="" || !neLegyenWhiteSpace.test(mCsatlakozasElem))mCsatlakozasElem=null;
    if(cGyartoElem=="" || !neLegyenWhiteSpace.test(cGyartoElem))cGyartoElem=null;
    if(kepneve=="")kepneve=null;


        fetch (`https://localhost:44316/api/Videokartya/0?name=${videokName}&vram=${vram}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                alaplapiCsatlakozas: aCsatlakozasElem,
                ajanlottTapegyseg: parseInt(atapegysegElem),
                monitorCsatlakozas: mCsatlakozasElem,
                chipGyartoja: cGyartoElem,
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
            else{
                alert("Sikeres feltöltés!");
                document.getElementById('VideokPatch1').value="";
                document.getElementById('VideokPatch2').value="";
                document.getElementById('VideokPatch3').value="";
                document.getElementById('VideokPatch4').value="";
            }
                
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
    const aHangkartya=document.querySelector('input[name="ivk_true"]:checked').value;
    var kepneve=String(fileName);

    console.log(processzorFoglalat);
    console.log(alaplapFormatum);
    console.log(maxFrekvencia);
    console.log(memoriaTipus);
    console.log(lapkakeszlet);
    console.log(slotSzam);
    console.log(aHangkartya);

    const neLegyenWhiteSpace=/[a-zA-Z]/;
    if(processzorFoglalat=="" || !neLegyenWhiteSpace.test(processzorFoglalat))processzorFoglalat=null;
    if(alaplapFormatum=="" || !neLegyenWhiteSpace.test(alaplapFormatum))alaplapFormatum=null;
    if(maxFrekvencia==0)maxFrekvencia=null;
    if(memoriaTipus=="" || !neLegyenWhiteSpace.test(memoriaTipus))memoriaTipus=null;
    if(lapkakeszlet=="" || !neLegyenWhiteSpace.test(lapkakeszlet))lapkakeszlet=null;
    if(slotSzam==0)slotSzam=null;
    if(kepneve=="")kepneve=null;

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
                Hangkartya : aHangkartya,
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
            else{
                alert("Sikeres feltöltés!");
                document.getElementById('AlaplapPatch1').value="";
                document.getElementById('AlaplapPatch2').value="";
                document.getElementById('AlaplapPatch3').value="";
                document.getElementById('AlaplapPatch4').value="";
                document.getElementById('AlaplapPatch5').value="";
                document.getElementById('AlaplapPatch6').value="";
            }
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            alert("Server hiba. Kérlek próbált meg később!");
        });
}
export function RequestProcesszorPatch(fileName, procNev)
{
    var frekvencia = document.getElementById('ProcPatch1').value; 
    var bFrekvencia = document.getElementById('ProcPatch2').value;
    var alaplapFoglalat = document.getElementById('ProcPatch3').value;
    var szalakSzama = document.getElementById('ProcPatch4').value;
    var tamogatottMemoriaTipus = document.getElementById('ProcPatch5').value;
    var processzormagokSzama = document.getElementById('ProcPatch6').value;
    var gyarto = document.getElementById('ProcPatch7').value;
    var ajanlottTapegyseg = document.getElementById('ProcPatch8').value;
    const integraltVideokartya = document.querySelector('input[name="ivk_true"]:checked').value;
    var kepneve=String(fileName);
    console.log(procNev);

    const neLegyenWhiteSpace=/[a-zA-z]/;
    if(frekvencia==0)frekvencia=null;
    if(bFrekvencia==0)bFrekvencia=null;
    if(alaplapFoglalat=="" || !neLegyenWhiteSpace.test(alaplapFoglalat))alaplapFoglalat=null;
    if(szalakSzama==0)szalakSzama=null;
    if(tamogatottMemoriaTipus=="" || !neLegyenWhiteSpace.test(tamogatottMemoriaTipus))tamogatottMemoriaTipus=null;
    if(processzormagokSzama==0)processzormagokSzama=null;
    if(gyarto=="" || !neLegyenWhiteSpace.test(gyarto))gyarto=null;
    if(ajanlottTapegyseg==0)ajanlottTapegyseg=null;
    if(kepneve=="")kepneve=null;

        fetch (`https://localhost:44316/api/Processzor/0?name=${procNev}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                AlaplapFoglalat: alaplapFoglalat,
                SzalakSzama: parseInt(szalakSzama),
                TamogatottMemoriatipus: tamogatottMemoriaTipus,
                ProcesszormagokSzama: parseInt(processzormagokSzama),
                ProcesszorFrekvencia: parseInt(frekvencia),
                BProcesszorFrekvencia: parseInt(bFrekvencia),
                Gyarto: gyarto,
                AjanlottTapegyseg : parseInt(ajanlottTapegyseg),
                IntegraltVideokartya: integraltVideokartya,
                kepnev: kepneve,
            }),
        })
        .then((response) => {
            console.log(response.status)
            if (!response.ok) {
                //409
                if(response.status === 409){
                    alert("Ez a processzor már szerepel ezzel a névvel.")
                }
                else{
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            }
            else{
                alert("Sikeres feltöltés!");
                document.getElementById('ProcPatch1').value="";
                document.getElementById('ProcPatch2').value="";
                document.getElementById('ProcPatch3').value="";
                document.getElementById('ProcPatch4').value="";
                document.getElementById('ProcPatch5').value="";
                document.getElementById('ProcPatch6').value="";
                document.getElementById('ProcPatch7').value="";
                document.getElementById('ProcPatch8').value="";
            }
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            alert("Server hiba. Kérlek próbált meg később!");
        });
}
export function RequestRamPatch(fileName, ramNev, ramFrekvencia, ramMeret)
{
    var memoriaTipus = document.getElementById('RamPatch1').value;
    var kepneve=String(fileName);

    const neLegyenWhiteSpace=/[a-zA-Z]/;

    if(memoriaTipus=="" && !neLegyenWhiteSpace.test(memoriaTipus))memoriaTipus=null;
    if(kepneve=="")kepneve=null;

        fetch (`https://localhost:44316/api/Ram/0?name=${ramNev}&frekvencia=${ramFrekvencia}&meret=${ramMeret}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                MemoriaTipus: memoriaTipus,
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
            else{
                alert("Sikeres feltöltés!");
                document.getElementById('RamPatch1').value="";
            }
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            alert("Server hiba. Kérlek próbált meg később!");
        });
}
//------------DELETE----------------------------------------------
export async function RequestVideokDelete(videokName, vram)
{
    await fetch (`https://localhost:44316/api/Videokartya/0?name=${videokName}&vram=${vram}`, {
        method: "DELETE",
    })
    .then((response) => {
        console.log(response.status)
        if (!response.ok) {
            if(response.status === 404){
                alert("Ez a videokártya nem található.")
            }
            throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
        }
        else alert("Sikeres törlés!");
            
        return response.json()
    })
    .catch((error) => {
        console.error("Hiba történt:", error)
        alert("Server hiba. Kérlek próbált meg később!");
    });
}
export async function RequestAlaplapDelete(alaplapnev)
{
    await fetch (`https://localhost:44316/api/Alaplap/0?name=${alaplapnev}`, {
        method: "DELETE",
    })
    .then((response) => {
        console.log(response.status)
        if (!response.ok) {
            if(response.status === 404){
                alert("Ez az alaplap nem található.")
            }
            throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
        }
        else alert("Sikeres törlés!");
            
        return response.json()
    })
    .catch((error) => {
        console.error("Hiba történt:", error)
        alert("Server hiba. Kérlek próbált meg később!");
    });
}
export async function RequestProcesszorDelete(procNev)
{
    await fetch (`https://localhost:44316/api/Processzor/0?name=${procNev}`, {
        method: "DELETE",
    })
    .then((response) => {
        console.log(response.status)
        if (!response.ok) {
            if(response.status === 404){
                alert("Ez a processzor nem található.")
            }
            throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
        }
        else alert("Sikeres törlés!");
            
        return response.json()
    })
    .catch((error) => {
        console.error("Hiba történt:", error)
        alert("Server hiba. Kérlek próbált meg később!");
    });
}
export async function RequestRamDelete(ramNev, ramFrekvencia, ramMeret)
{
    await fetch (`https://localhost:44316/api/Ram/0?name=${ramNev}&frekvencia=${ramFrekvencia}&meret=${ramMeret}`, {
        method: "DELETE",
    })
    .then((response) => {
        console.log(response.status)
        if (!response.ok) {
            if(response.status === 404){
                alert("Ez a memória nem található.")
            }
            throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
        }
        else alert("Sikeres törlés!");
            
        return response.json()
    })
    .catch((error) => {
        console.error("Hiba történt:", error)
        alert("Server hiba. Kérlek próbált meg később!");
    });
}