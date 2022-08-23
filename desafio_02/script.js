let salir = false,
    db_prestamo = [];

// declaro clase prestamo
class Prestamo {
    constructor(monto, cuotas, interes) {
        this.monto = monto;
        this.cuotas = cuotas;
        this.interes = monto * interes / 100;
        this.total = monto + this.interes;
    }
// metodo para obtener datos
    get_datos() {
        alert(`Info sobre el préstamo solicitado:
                Monto: $` +this.monto + `
                Cuotas: ` +this.cuotas + `
                Total a pagar con interés: ` +this.total);
    }

}

//este do while es solo para implementar lo ya visto, porq no hace nada realmente
do {
    function tres_cuotas() {
        monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
        if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
            let prestamo_uno = new Prestamo(monto, 3, 15);
            prestamo_uno.get_datos(); 
            db_prestamo.push(prestamo_uno);
            console.log(db_prestamo);

            // en un futuro quisiera poder darle un id a cada prestamo para no tener que llamar a la posicion del index del array y en su lugar poder automaticamente detectar su correspondiente ID
}

    function seis_cuotas() {
        monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
        if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
            db_prestamo.push(new Prestamo(0, 6, 0));
            db_prestamo[0].set_monto(monto);
            db_prestamo[0].set_interes(25);
            db_prestamo[0].set_cuotas(6);
            db_prestamo[0].set_total();
	        db_prestamo[0].get_datos();
}

    function doce_cuotas() {
        monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
        if (Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
            db_prestamo.push(new Prestamo(0, 12, 0));
            db_prestamo[0].set_monto(monto);
            db_prestamo[0].set_interes(35);
            db_prestamo[0].set_cuotas(12)
            db_prestamo[0].set_total()
	        db_prestamo[0].get_datos()
}

} while (salir === true)





    
