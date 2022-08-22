let salir = false,
    db_prestamo = [],
    monto = 0;


class Prestamo {
    constructor(monto, cuotas, interes) {
        this.monto = monto;
        this.cuotas = cuotas;
        this.interes = monto * interes / 100;
    }

    get_datos() {
        alert(`Info sobre el préstamo solicitado:
                Monto: $` +this.monto + `
                Cuotas: ` +this.cuotas + `
                Total a pagar con interés: ` +this.interes);
    }

    set_monto(monto) {
        this.monto = monto;
    }

    set_interes(int) {
        this.interes = monto * int / 100;
    }
    
    set_total() {
        this.total = monto + this.interes;
    }
  
}


do {
    function tres_cuotas() {
        monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
        if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
            db_prestamo.push(new Prestamo(0, 3, 0));
            db_prestamo[0].set_monto(monto);
            db_prestamo[0].set_interes(15);
            db_prestamo[0].set_total()
            db_prestamo[0].get_datos()
}

    function seis_cuotas() {
        monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
        if(Number.isNaN(prestamo)) return alert("Este simulador sólo admite números como parámetro");
            db_prestamo.push(new Prestamo(0, 6, 0));
            db_prestamo[0].set_monto(monto);
            db_prestamo[0].set_interes(25);
            db_prestamo[0].set_total()
	        db_prestamo[0].get_datos()
}
    function doce_cuotas() {
        monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
        if (Number.isNaN(prestamo)) return alert("Este simulador sólo admite números como parámetro");
            db_prestamo.push(new Prestamo(0, 12, 0));
            db_prestamo[0].set_monto(monto);
            db_prestamo[0].set_interes(35);
            db_prestamo[0].set_total()
	        db_prestamo[0].get_datos()
}

} while (salir === true)





    
