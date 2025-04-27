var errors=[];
var alertVisszahiv=null;

export function setAlertVisszahiv(visszahiv) {
    alertVisszahiv = visszahiv;
}

export function addHiba(hiba) {
    errors.push(hiba);
}

export function showHiba(uzenet,sikerese=false){
    if(alertVisszahiv){
        var errorkuldes = [...errors];
        alertVisszahiv(uzenet,errorkuldes,sikerese);
        errors.length=0;
    }
}