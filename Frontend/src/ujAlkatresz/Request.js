import {addHiba,showHiba} from '../Alert/alertService.js'

var errors=[];
const neLegyenWhiteSpace=/[a-zA-Z]/;

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

    if(!neLegyenWhiteSpace.test(nevElem))errors.push("A névnek tartalmaznia kell legalább egy betüt");
    if(!neLegyenWhiteSpace.test(aCsatlakozasElem))errors.push("Alaplap csatlakozásnak tartalmaznia kell legalább egy betüt");
    if(atapegysegElem<4 || atapegysegElem>500)errors.push("Ajánlott tápegység mértéke nem lehet 4W-nál és 500W-nál nagyobb");
    if(!neLegyenWhiteSpace.test(mCsatlakozasElem))errors.push("Monitor csatlakozásnak tartalmaznia kell legalább egy betüt");
    if(!neLegyenWhiteSpace.test(cGyartoElem))errors.push("Chip gyártónak tartalmaznia kell legalább egy betüt");
    if(vramElem==null)errors.push("Vram nem lehet üres");
    if(vramElem<=0)errors.push("Vram nem lehet 0Gb vagy kevesebb")
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


    if(!neLegyenWhiteSpace.test(aNevElem))errors.push("A névnek tartalmaznia kell legalább egy betüt!");
    if(!neLegyenWhiteSpace.test(processzorFoglalatElem))errors.push("A Proceszorfoglalatnak tartalmaznia kell legalább egy betüt!");
    if(!neLegyenWhiteSpace.test(alaplapFormatumElem))errors.push("Az alaplapformátumnak tartalmazni kell legalább egy betüt");
    if(maxFrekvenciaElem<600 || maxFrekvenciaElem>25000)errors.push("A Frekvenciának 600Hz és 25000Hz között kell lenni");
    if(!neLegyenWhiteSpace.test(memoriaTipusElem))errors.push("A memoria tipusnak tartalmazni kell legalább egy betüt");
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
    errors.length=0;
    var mNevElem = document.getElementById('MemoriaPost1').value;
    var memoriaTipusElem = document.getElementById('MemoriaPost2').value;
    var frekvenciaElem = document.getElementById('MemoriaPost3').value;
    var meretElem = document.getElementById('MemoriaPost4').value;
    var kepneve=String(fileUrl);
    
    if(!neLegyenWhiteSpace.test(mNevElem))errors.push("A névnek tartalmaznia kell legalább egy betüt");
    if(!neLegyenWhiteSpace.test(memoriaTipusElem))errors.push("A memoriatipusnak tartalmazni kell legalább egy betüt");
    if(frekvenciaElem<65 || frekvenciaElem>25000) errors.push("A frekvencia értékének 65 és 25000 MHz között kell lennie")
    if(meretElem<64 || meretElem>1024)errors.push("A ram méretnek 64mb és  1024Gb közöttinek kell lennie")

    if (errors.length==0) 
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
                        showHiba("Ez a memória már szerepel ezzel a konfigurácioval.",false)
                    }
                    else{
                        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                    }
                }
                else{
                    showHiba("Sikeres feltöltés!",true);
                    document.getElementById('MemoriaPost1').value=""
                    document.getElementById('MemoriaPost2').value=""
                    document.getElementById('MemoriaPost3').value=""
                    document.getElementById('MemoriaPost4').value=""
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

export function RequestProcesszorP(fileUrl){
    errors.length=0;
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

    if(!neLegyenWhiteSpace.test(pNevElem))errors.push("A névnek tartalmaznia kell legalább egy betüt");
    if(frekvenciaElem<0,1 || frekvenciaElem>8)errors.push("A processzor gyári frekvenciájának 0,1 és 8Ghz között kell lennie");
    if(bFrekvenciaElem<0,5 || bFrekvenciaElem>25)errors.push("A processzor boostolt frekvenciájának 0,5 és 25Ghz között kell lennie");
    if(frekvenciaElem>bFrekvenciaElem)errors.push("A processzor gyári frekvenciája nem lehet magasabb mint a boostolt frekvencia");
    if(!neLegyenWhiteSpace.test(alaplapFoglalatElem))errors.push("Az alaplap foglalatnak tartalmaznia kell legalább egy betüt");
    if(szalakSzamaElem<1)errors.push("A processzorban a szálak száma nem lehet kisebb mint egy");
    if(!neLegyenWhiteSpace.test(tamogatottMemoriaTipusElem))errors.push("A processzor által támogatott memoria tipusnak tartalmazni kell legalább egy betüt");
    if(processzormagokSzamaElem<1)errors.push("A processzorban a magok száma nem lehet kisebb mint egy");
    if(!neLegyenWhiteSpace.test(gyartoElem))errors.push("A processzor gyártójának nevében szerepenie kell legalább egy betünek");
    if(ajanlottTapegysegElem<2 ||ajanlottTapegysegElem>500)errors.push("Az ajánlott tápegység mértéke nem lehet 2W-nál és 500W-nál nagyobb")
    if (errors.length==0) 
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
                        showHiba("Ez az processzor már szerepel ezzel a konfigurácioval.",false)
                    }
                    else{
                        throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                    }
                }
                else{
                    showHiba("Sikeres feltöltés!",true);
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
//------------PATCH----------------------------------------------
export function RequestVideokPatch(fileName, videokName, vram,)
{
    errors.length=0;
    var aCsatlakozasElem = document.getElementById('VideokPatch1').value;
    var atapegysegElem = document.getElementById('VideokPatch2').value;
    var mCsatlakozasElem = document.getElementById('VideokPatch3').value;  
    var cGyartoElem = document.getElementById('VideokPatch4').value;
    var kepneve=String(fileName);

    if(videokName=="")errors.push("Ki kell választani egy videokártya nevet!");
    if(vram=="")errors.push("Ki kell választani egy videokártya vramot");
    if(aCsatlakozasElem=="" || !neLegyenWhiteSpace.test(aCsatlakozasElem))aCsatlakozasElem=null;
    if(atapegysegElem==0)atapegysegElem=null;
    if(mCsatlakozasElem=="" || !neLegyenWhiteSpace.test(mCsatlakozasElem))mCsatlakozasElem=null;
    if(cGyartoElem=="" || !neLegyenWhiteSpace.test(cGyartoElem))cGyartoElem=null;
    if(kepneve=="")kepneve=null;

    if(errors.length==0){
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
                    showHiba("Ez a videokártya már szerepel ezzel a vram konfigurácioval.",false)
                }
                else{
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            }
            else{
                showHiba("Sikeres feltöltés!",true);
                document.getElementById('VideokPatch1').value="";
                document.getElementById('VideokPatch2').value="";
                document.getElementById('VideokPatch3').value="";
                document.getElementById('VideokPatch4').value="";
            }
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            showHiba("Server hiba. Kérlek próbált meg később!",false);
        });
    }
    else{
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
    }
        
}
export function RequestAlaplapPatch(fileName, alaplapnev)
{
    errors.length=0;
    var processzorFoglalat = document.getElementById('AlaplapPatch1').value;
    var alaplapFormatum = document.getElementById('AlaplapPatch2').value;
    var maxFrekvencia = document.getElementById('AlaplapPatch3').value;  
    var memoriaTipus = document.getElementById('AlaplapPatch4').value;
    var lapkakeszlet=document.getElementById('AlaplapPatch5').value;
    var slotSzam=document.getElementById('AlaplapPatch6').value;
    const aHangkartya=document.querySelector('input[name="ivk_true"]:checked').value;
    var kepneve=String(fileName);

    if(alaplapnev=="")errors.push("Ki kell választani egy alaplap nevet");
    if(processzorFoglalat=="" || !neLegyenWhiteSpace.test(processzorFoglalat))processzorFoglalat=null;
    if(alaplapFormatum=="" || !neLegyenWhiteSpace.test(alaplapFormatum))alaplapFormatum=null;
    if(maxFrekvencia==0)maxFrekvencia=null;
    if(memoriaTipus=="" || !neLegyenWhiteSpace.test(memoriaTipus))memoriaTipus=null;
    if(lapkakeszlet=="" || !neLegyenWhiteSpace.test(lapkakeszlet))lapkakeszlet=null;
    if(slotSzam==0)slotSzam=null;
    if(kepneve=="")kepneve=null;

    if(errors.length==0){
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
                    showHiba("Ez a videokártya már szerepel ezzel a vram konfigurácioval.",false)
                }
                else{
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            }
            else{
                showHiba("Sikeres feltöltés!",true);
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
            showHiba("Server hiba. Kérlek próbált meg később!",false);
        });
    }
    else{
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
    }
        
}
export function RequestProcesszorPatch(fileName, procNev)
{
    errors.length=0;
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

    if(procNev=="")errors.push("Ki kell választani egy processzor nevet ")
    if(frekvencia==0)frekvencia=null;
    if(bFrekvencia==0)bFrekvencia=null;
    if(alaplapFoglalat=="" || !neLegyenWhiteSpace.test(alaplapFoglalat))alaplapFoglalat=null;
    if(szalakSzama==0)szalakSzama=null;
    if(tamogatottMemoriaTipus=="" || !neLegyenWhiteSpace.test(tamogatottMemoriaTipus))tamogatottMemoriaTipus=null;
    if(processzormagokSzama==0)processzormagokSzama=null;
    if(gyarto=="" || !neLegyenWhiteSpace.test(gyarto))gyarto=null;
    if(ajanlottTapegyseg==0)ajanlottTapegyseg=null;
    if(kepneve=="")kepneve=null;
    if(errors.length==0){
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
                    showHiba("Ez a processzor már szerepel ezzel a névvel.",false)
                }
                else{
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            }
            else{
                showHiba("Sikeres feltöltés!",true);
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
            showHiba("Server hiba. Kérlek próbált meg később!",false);
        });
    }
    else{
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
    }
}
export function RequestRamPatch(fileName, ramNev, ramFrekvencia, ramMeret)
{
    errors.length=0;
    var memoriaTipus = document.getElementById('RamPatch1').value;
    var kepneve=String(fileName);

    if(ramNev=="")errors.push("Ki kell választani egy nevet")
    if(ramFrekvencia=="")errors.push("Ki kell választani egy frekvenciát")
    if(ramMeret=="")errors.push("Ki kell választani egy méretet")
    if(memoriaTipus=="" && !neLegyenWhiteSpace.test(memoriaTipus))memoriaTipus=null;
    if(kepneve=="")kepneve=null;
    if(errors.length==0){
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
                    showHiba("Ez a memória már szerepel ezzel a konfigurácioval.",false)
                }
                else{
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            }
            else{
                showHiba("Sikeres feltöltés!",true);
                document.getElementById('RamPatch1').value="";
            }
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            showHiba("Server hiba. Kérlek próbált meg később!",false);
        });
    }
    else{
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
    }
        
}
//------------DELETE----------------------------------------------
export async function RequestVideokDelete(videokName, vram)
{
    errors.length=0;
    if(videokName=="")errors.push("Ki kell választani egy nevet")
    if(vram=="")errors.push("Ki kell választani a videokártya vramját")
    if(errors.length==0){
        await fetch (`https://localhost:44316/api/Videokartya/0?name=${videokName}&vram=${vram}`, {
            method: "DELETE",
        })
        .then((response) => {
            console.log(response.status)
            if (!response.ok) {
                if(response.status === 404){
                    showHiba("Ez a videokártya nem található.",false)
                }
                throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
            }
            else showHiba("Sikeres törlés!",true);
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            showHiba("Server hiba. Kérlek próbált meg később!",false);
        });
    }
    else{
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
    }
    
}
export async function RequestAlaplapDelete(alaplapnev)
{
    errors.length=0;
    if(alaplapnev=="")errors.push("Ki kell választani egy nevet")
    if(errors.length==0){
        await fetch (`https://localhost:44316/api/Alaplap/0?name=${alaplapnev}`, {
            method: "DELETE",
        })
        .then((response) => {
            console.log(response.status)
            if (!response.ok) {
                if(response.status === 404){
                    showHiba("Ez az alaplap nem található.",false)
                }
                throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
            }
            else showHiba("Sikeres törlés!",true);
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            showHiba("Server hiba. Kérlek próbált meg később!",false);
        });
    }
    else{
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
    }
    
}
export async function RequestProcesszorDelete(procNev)
{
    errors.length=0;
    if(procNev=="")errors.length("Ki kell választani egy nevet")
    if(errors.length==0){
        await fetch (`https://localhost:44316/api/Processzor/0?name=${procNev}`, {
            method: "DELETE",
        })
        .then((response) => {
            console.log(response.status)
            if (!response.ok) {
                if(response.status === 404){
                    showHiba("Ez a processzor nem található.",false)
                }
                throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
            }
            else showHiba("Sikeres törlés!",true);
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            showHiba("Server hiba. Kérlek próbált meg később!",false);
        });
    }
    else{
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
    }
    
}
export async function RequestRamDelete(ramNev, ramFrekvencia, ramMeret)
{
    errors.length=0;
    if(ramNev=="")errors.push("Ki kell választani egy nevet")
    if(ramFrekvencia=="")errors.push("Ki kell választani egy ram frekvenciát")
    if(ramMeret=="")errors.push("Ki kell választani egy meretet")
    if(errors.length==0){
        await fetch (`https://localhost:44316/api/Ram/0?name=${ramNev}&frekvencia=${ramFrekvencia}&meret=${ramMeret}`, {
            method: "DELETE",
        })
        .then((response) => {
            console.log(response.status)
            if (!response.ok) {
                if(response.status === 404){
                    showHiba("Ez a memória nem található.",false)
                }
                throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
            }
            else showHiba("Sikeres törlés!",true);
                
            return response.json()
        })
        .catch((error) => {
            console.error("Hiba történt:", error)
            showHiba("Server hiba. Kérlek próbált meg később!",false);
        });
    }
    else{
        errors.forEach((error)=>{
            addHiba(error);
            console.log(error);
        });
        showHiba("Hiba történt",false);
        errors.length = 0;
    }
    
}