var errors=[];
var alertVisszahiv=null;

export function setAlertVisszahiv(visszahiv) {
    alertVisszahiv = visszahiv;
}

export function addHiba(hiba) {
    errors.push(hiba);
    //console.log('Hiba hozzáadva az alertService-ben:', hiba);
}

export function showHiba(uzenet,sikerese=false){
    //console.log('showHiba hívva:', uzenet, errors, sikerese);
    if(alertVisszahiv){
        var errorkuldes = [...errors];
        alertVisszahiv(uzenet,errorkuldes,sikerese);
        errors.length=0;
    }
}