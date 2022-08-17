let prestamo = 0,
    interes = 0,
    new_prestamo = 0,
    tres = 0,
    seis = 0,
    nueve = 0,
    ok = false;

do {
function tres_cuotas(prestamo) {
    prestamo = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
    if (Number.isNaN(prestamo)) return alert("Este simulador sólo admite números como parámetro");
    tres++;
    for (i = 0; i == 0; i++) {
        interes = prestamo * 0.15;
    }
    alert("Para la cantidad de: $" +prestamo.toFixed(2)+ " , en 3 cuotas, el interés a pagar sería de: $" +Math.round(interes));
}

function seis_cuotas(prestamo) {
    prestamo = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
    if (Number.isNaN(prestamo)) return alert("Este simulador sólo admite números como parámetro");
    seis++;
    for (i = 0; i == 0; i++) {
        interes = prestamo * 0.25;
    }
    alert("Para la cantidad de: $" +prestamo.toFixed(2)+ " , en 6 cuotas, el interés a pagar sería de: $" +Math.round(interes));
}

function nueve_cuotas(prestamo) {
    prestamo = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
    if (Number.isNaN(prestamo)) return alert("Este simulador sólo admite números como parámetro");
    nueve++;
    for (i = 0; i == 0; i++) {
        interes = prestamo * 0.35;
    }
    alert("Para la cantidad de: $" +prestamo.toFixed(2)+ " , en 9 cuotas, el interés a pagar sería de: $" +Math.round(interes));
}
} while (ok == true);





    
