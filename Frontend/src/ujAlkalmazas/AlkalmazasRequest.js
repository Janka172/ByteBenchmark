import {addHiba,showHiba} from '../Alert/alertService.js'

var errors=[];
const neLegyenWhiteSpace=/[a-zA-Z]/;

export async function Ellenorzes(fileUrl,categoria,minVideokartyaNev,minVideokartyaVram,minAlaplapNev,minMemoriaNev,minMemoriaFrekvencia,minMemoriaMeret,minProcesszorNev,minOprendszerNev,maxVideokartyaNev,maxVideokartyaVram,maxAlaplapNev,maxMemoriaNev,maxMemoriaFrekvencia,maxMemoriaMeret,maxProcesszorNev,maxOprendszerNev){
    errors.length=0;
    var alkNev=document.getElementById("alkNamePost") .value
    var alkMeret=document.getElementById("alkSizePost").value

    if(!neLegyenWhiteSpace.test(alkNev))errors.push("A névnek tartalmaznia kell legalább egy betüt");
    if(alkMeret<0.05 || alkMeret>900)errors.push("A méretnek 0.05 és 900Gb között kell lennie");
    if(categoria=="")errors.push("Ki kell választani a kategóriát");
    if(minVideokartyaNev=="")errors.push("Ki kell választani a minimum Videokártya nevét");
    if(minVideokartyaVram=="")errors.push("Ki kell választani a minimum Videokártya Vram értékét");
    if(minAlaplapNev=="")errors.push("Ki kell választani a minimum Alaplap nevét");
    if(minMemoriaNev=="")errors.push("Ki kell választani a minimum Memória nevét");
    if(minMemoriaFrekvencia=="")errors.push("Ki kell választani a minimum Memória Frekvenciát");
    if(minMemoriaMeret=="")errors.push("Ki kell választani a minimum Memória Méretet");
    if(minProcesszorNev=="")errors.push("Ki kell választani a minimum Processzor nevét");
    if(minOprendszerNev=="")errors.push("Ki kell választani a minimum Operációs rendszer nevét");
    if(maxVideokartyaNev=="")errors.push("Ki kell választani a maximum Videokártya nevét");
    if(maxVideokartyaVram=="")errors.push("Ki kell választani a maximum Videokártya Vram értékét");
    if(maxAlaplapNev=="")errors.push("Ki kell választani a maximum Alaplap nevét");
    if(maxMemoriaNev=="")errors.push("Ki kell választani a maximum Memória nevét");
    if(maxMemoriaFrekvencia=="")errors.push("Ki kell választani a maximum Memória Frekvenciát");
    if(maxMemoriaMeret=="")errors.push("Ki kell választani a maximum Memória Méretet");
    if(maxProcesszorNev=="")errors.push("Ki kell választani a maximum Processzor nevét");
    if(maxOprendszerNev=="")errors.push("Ki kell választani a maximum Operációs rendszer nevét");

    if(errors.length==0){
            await RequstAlkalmazasP(fileUrl,categoria,alkNev,alkMeret)
            await RequstMinSetupP(alkNev,minVideokartyaNev,minVideokartyaVram,minAlaplapNev,minMemoriaNev,minMemoriaFrekvencia,minMemoriaMeret,minProcesszorNev,minOprendszerNev)
            await RequstMaxSetupP(alkNev,maxVideokartyaNev,maxVideokartyaVram,maxAlaplapNev,maxMemoriaNev,maxMemoriaFrekvencia,maxMemoriaMeret,maxProcesszorNev,maxOprendszerNev)
            document.getElementById("alkNamePost").value="";
            document.getElementById("alkSizePost").value="";
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

export function RequstAlkalmazasP(fileUrl,categoria,alkNev,alkMeret){
    return new Promise((resolve, reject) => {
        var kepneve = String(fileUrl);
        fetch("https://localhost:44316/api/Applikacio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Nev: alkNev,
                KategoriaNev: categoria,
                KepeleresiUtja: kepneve,
                Tarhely: parseInt(alkMeret),
            }),
        })
        .then((response) => {
            if (response.status > 299) {
                if (response.status === 409) {
                    showHiba("Már létezik ilyen nevű alkalmazás", false);
                    reject(new Error("Már létezik ilyen nevű alkalmazás"));
                } else if (response.status === 400) {
                    showHiba("Sikertelen feltöltés", false);
                    reject(new Error("Sikertelen feltöltés"));
                } else {
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            } else {
                showHiba("Sikeres feltöltés", true);
                resolve();
            }
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            showHiba("Server hiba. Kérlek próbáld meg később!", false);
            reject(error);
        });
    });
}

export function RequstMinSetupP(alkNev,minVideokartyaNev,minVideokartyaVram,minAlaplapNev,minMemoriaNev,minMemoriaFrekvencia,minMemoriaMeret,minProcesszorNev,minOprendszerNev){
    return new Promise((resolve, reject) => {
        fetch("https://localhost:44316/api/Setup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ApplikacioNeve: alkNev,
                Gepigeny: "min",
                VidekortyaNev: minVideokartyaNev,
                Vram: parseInt(minVideokartyaVram),
                ProcesszorNev: minProcesszorNev,
                OprendszerNev: minOprendszerNev,
                RamNeve: minMemoriaNev,
                RamFrekvencia: parseInt(minMemoriaFrekvencia),
                RamMeret: parseInt(minMemoriaMeret),
                AlaplapNeve: minAlaplapNev,
            }),
        })
        .then((response) => {
            if (response.status > 299) {
                if (response.status === 400) {
                    showHiba(`${response.statusText}`, false);
                    reject(new Error(response.statusText));
                } else if (response.status === 500) {
                    showHiba("Hiba lépett fel a szerveren", false);
                    reject(new Error("Hiba lépett fel a szerveren"));
                } else {
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            } else {
                showHiba("Sikeres feltöltés", true);
                resolve();
            }
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            showHiba("Server hiba. Kérlek próbáld meg később!", false);
            reject(error);
        });
    });
}
export function RequstMaxSetupP(alkNev,maxVideokartyaNev,maxVideokartyaVram,maxAlaplapNev,maxMemoriaNev,maxMemoriaFrekvencia,maxMemoriaMeret,maxProcesszorNev,maxOprendszerNev){
    return new Promise((resolve, reject) => {
        fetch("https://localhost:44316/api/Setup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ApplikacioNeve: alkNev,
                Gepigeny: "opt",
                VidekortyaNev: maxVideokartyaNev,
                Vram: parseInt(maxVideokartyaVram),
                ProcesszorNev: maxProcesszorNev,
                OprendszerNev: maxOprendszerNev,
                RamNeve: maxMemoriaNev,
                RamFrekvencia: parseInt(maxMemoriaFrekvencia),
                RamMeret: parseInt(maxMemoriaMeret),
                AlaplapNeve: maxAlaplapNev,
            }),
        })
        .then((response) => {
            if (response.status > 299) {
                if (response.status === 400) {
                    showHiba(`${response.statusText}`, false);
                    reject(new Error(response.statusText));
                } else if (response.status === 500) {
                    showHiba("Hiba lépett fel a szerveren", false);
                    reject(new Error("Hiba lépett fel a szerveren"));
                } else {
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            } else {
                showHiba("Sikeres feltöltés", true);
                resolve();
            }
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            showHiba("Server hiba. Kérlek próbáld meg később!", false);
            reject(error);
        });
    });
}

//-------------------------Patch-------------------------
export async function PatchEllenorzes(fileUrl,alkNev,categoria,minVideokartyaNev,minVideokartyaVram,minAlaplapNev,minMemoriaNev,minMemoriaFrekvencia,minMemoriaMeret,minProcesszorNev,minOprendszerNev,maxVideokartyaNev,maxVideokartyaVram,maxAlaplapNev,maxMemoriaNev,maxMemoriaFrekvencia,maxMemoriaMeret,maxProcesszorNev,maxOprendszerNev){
    errors.length=0;
    var alkMeret=document.getElementById("alkSizePost").value

    if(!neLegyenWhiteSpace.test(alkNev))errors.push("Ki kell választani az Alkallmazást");
    if(errors.length==0){
        if(alkMeret<0.05 || alkMeret>900)errors.push("A méretnek 0.05 és 900Gb között kell lennie");
        if(minVideokartyaNev=="")errors.push("Ki kell választani a minimum Videokártya nevét");
        if(minVideokartyaVram=="")errors.push("Ki kell választani a minimum Videokártya Vram értékét");
        if(minAlaplapNev=="")errors.push("Ki kell választani a minimum Alaplap nevét");
        if(minMemoriaNev=="")errors.push("Ki kell választani a minimum Memória nevét");
        if(minMemoriaFrekvencia=="")errors.push("Ki kell választani a minimum Memória Frekvenciát");
        if(minMemoriaMeret=="")errors.push("Ki kell választani a minimum Memória Méretet");
        if(minProcesszorNev=="")errors.push("Ki kell választani a minimum Processzor nevét");
        if(minOprendszerNev=="")errors.push("Ki kell választani a minimum Operációs rendszer nevét");
        if(maxVideokartyaNev=="")errors.push("Ki kell választani a maximum Videokártya nevét");
        if(maxVideokartyaVram=="")errors.push("Ki kell választani a maximum Videokártya Vram értékét");
        if(maxAlaplapNev=="")errors.push("Ki kell választani a maximum Alaplap nevét");
        if(maxMemoriaNev=="")errors.push("Ki kell választani a maximum Memória nevét");
        if(maxMemoriaFrekvencia=="")errors.push("Ki kell választani a maximum Memória Frekvenciát");
        if(maxMemoriaMeret=="")errors.push("Ki kell választani a maximum Memória Méretet");
        if(maxProcesszorNev=="")errors.push("Ki kell választani a maximum Processzor nevét");
        if(maxOprendszerNev=="")errors.push("Ki kell választani a maximum Operációs rendszer nevét");
    }
    if(errors.length==0){
            await RequstAlkalmazasPatch(fileUrl,categoria,alkNev,alkMeret)
            await RequstMinSetupPatch(alkNev,minVideokartyaNev,minVideokartyaVram,minAlaplapNev,minMemoriaNev,minMemoriaFrekvencia,minMemoriaMeret,minProcesszorNev,minOprendszerNev)
            await RequstMaxSetupPatch(alkNev,maxVideokartyaNev,maxVideokartyaVram,maxAlaplapNev,maxMemoriaNev,maxMemoriaFrekvencia,maxMemoriaMeret,maxProcesszorNev,maxOprendszerNev)
            document.getElementById("alkSizePost").value="";
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
export function RequstAlkalmazasPatch(fileUrl,categoria,alkNev,alkMeret){
    if(alkMeret===0)alkMeret=null;
    if(categoria==="")categoria=null;
    return new Promise((resolve, reject) => {
        var kepneve = String(fileUrl);
        if(fileUrl==="")kepneve=null;
        fetch(`https://localhost:44316/api/Applikacio/0?name=${alkNev}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Nev: null,
                KategoriaNev: categoria,
                KepeleresiUtja: kepneve,
                Tarhely: parseInt(alkMeret),
            }),
        })
        .then((response) => {
            if (response.status > 299) {
                if (response.status === 409) {
                    showHiba("Már létezik ilyen nevű alkalmazás", false);
                    reject(new Error("Már létezik ilyen nevű alkalmazás"));
                } else if (response.status === 400) {
                    showHiba("Sikertelen feltöltés", false);
                    reject(new Error("Sikertelen feltöltés"));
                } else {
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            } else {
                showHiba("Sikeres feltöltés", true);
                resolve();
            }
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            showHiba("Server hiba. Kérlek próbáld meg később!", false);
            reject(error);
        });
    });
}
export function RequstMinSetupPatch(alkNev,minVideokartyaNev,minVideokartyaVram,minAlaplapNev,minMemoriaNev,minMemoriaFrekvencia,minMemoriaMeret,minProcesszorNev,minOprendszerNev){
    return new Promise((resolve, reject) => {
        fetch(`https://localhost:44316/api/Setup/0?applikacionev=${alkNev}&igeny=min`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ApplikacioNeve: alkNev,
                Gepigeny: "min",
                VidekortyaNev: minVideokartyaNev,
                Vram: parseInt(minVideokartyaVram),
                ProcesszorNev: minProcesszorNev,
                OprendszerNev: minOprendszerNev,
                RamNeve: minMemoriaNev,
                RamFrekvencia: parseInt(minMemoriaFrekvencia),
                RamMeret: parseInt(minMemoriaMeret),
                AlaplapNeve: minAlaplapNev,
            }),
        })
        .then((response) => {
            if (response.status > 299) {
                if (response.status === 400) {
                    showHiba(`${response.statusText}`, false);
                    reject(new Error(response.statusText));
                } else if (response.status === 500) {
                    showHiba("Hiba lépett fel a szerveren", false);
                    reject(new Error("Hiba lépett fel a szerveren"));
                } else {
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            } else {
                showHiba("Sikeres feltöltés", true);
                resolve();
            }
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            showHiba("Server hiba. Kérlek próbáld meg később!", false);
            reject(error);
        });
    });
}
export function RequstMaxSetupPatch(alkNev,maxVideokartyaNev,maxVideokartyaVram,maxAlaplapNev,maxMemoriaNev,maxMemoriaFrekvencia,maxMemoriaMeret,maxProcesszorNev,maxOprendszerNev){
    return new Promise((resolve, reject) => {
        fetch(`https://localhost:44316/api/Setup/0?applikacionev=${alkNev}&igeny=opt`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ApplikacioNeve: alkNev,
                Gepigeny: "opt",
                VidekortyaNev: maxVideokartyaNev,
                Vram: parseInt(maxVideokartyaVram),
                ProcesszorNev: maxProcesszorNev,
                OprendszerNev: maxOprendszerNev,
                RamNeve: maxMemoriaNev,
                RamFrekvencia: parseInt(maxMemoriaFrekvencia),
                RamMeret: parseInt(maxMemoriaMeret),
                AlaplapNeve: maxAlaplapNev,
            }),
        })
        .then((response) => {
            if (response.status > 299) {
                if (response.status === 400) {
                    showHiba(`${response.statusText}`, false);
                    reject(new Error(response.statusText));
                } else if (response.status === 500) {
                    showHiba("Hiba lépett fel a szerveren", false);
                    reject(new Error("Hiba lépett fel a szerveren"));
                } else {
                    throw new Error(`HTTP hiba! Státuszkód: ${response.status}`);
                }
            } else {
                showHiba("Sikeres feltöltés", true);
                resolve();
            }
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            showHiba("Server hiba. Kérlek próbáld meg később!", false);
            reject(error);
        });
    });
}

export async function DeleteEllenorzes(alkNev){
    errors.length=0;
    if(!neLegyenWhiteSpace.test(alkNev))errors.push("Ki kell választani az Alkallmazást");
    if(errors.length==0){
            await RequstAlkalmazasDelete(alkNev)
            document.getElementById("alkSizePost").value="";
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
export function RequstAlkalmazasDelete(alkNev){
    console.log(alkNev);
        fetch(`https://localhost:44316/api/Applikacio/0?name=${alkNev}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.status > 299) {
                if (response.status === 404) {
                    showHiba("Nem található ilyen Alkallmazás", false);
                }else {
                    throw new Error(`HTTP hiba! Státuszkód:  ${response.status}`);
                }
            } else {
                showHiba("Sikeres törlés", true);
            }
        })
        .catch((error) => {
            console.error("Hiba történt:", error);
            showHiba("Server hiba. Kérlek próbáld meg később!", false);
        });
}