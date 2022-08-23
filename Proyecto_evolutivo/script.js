let salir = false,
    db_prestamo = [],
    db_user = [],
    new_prestamo = {};

// declaro clase prestamo
class Prestamo {
    constructor(monto, cuotas, interes) {
        this.monto = monto;
        this.cuotas = cuotas;
        this.interes = monto * interes / 100;
        this.total = monto + this.interes;
    }


// metodo para obtener datos sobre el prestamo
    get_datos() {
        
            alert(`Info sobre el préstamo solicitado:
                Monto: $` +this.monto + `
                Cuotas: ` +this.cuotas + `
                Total a pagar con interés: ` +this.total);
    }

}

//declaro clase usuario 
// class Usuario {
//     constructor(user, pass) {
//         this.user = user;
//         this.pass = pass;
//     }
// }


function prestamo(cuota) {
    
        if (cuota ===3) {
            monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
            if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
            return new_prestamo = new Prestamo(monto, cuota, 15);

        } else if (cuota === 6) {
            monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
            if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
            return new_prestamo = new Prestamo(monto, cuota, 25);

        } else if (cuota === 12) {
            monto = parseInt(prompt("Ingrese el monto a calcular en pesos argentinos: "), 10);
            if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
            return new_prestamo = new Prestamo(monto, cuota, 35);
        }
        
}

do {//este do while es solo para implementar lo ya visto, porq no hace nada realmente

    function tres_cuotas(prestamo) {
        prestamo(3);
        db_prestamo.push(new_prestamo);// lo pusheo dentro de mi db_prestamo
        new_prestamo.get_datos(); //obtengo los datos con el getter
        //console.log(db_prestamo);
        }

    function seis_cuotas(prestamo) {
        prestamo(6);
        db_prestamo.push(new_prestamo);// lo pusheo dentro de mi db_prestamo
        new_prestamo.get_datos(); //obtengo los datos con el getter
        //console.log(db_prestamo);
        }

    function doce_cuotas(prestamo) {
        prestamo(12);
        db_prestamo.push(new_prestamo);// lo pusheo dentro de mi db_prestamo
        new_prestamo.get_datos(); //obtengo los datos con el getter
        //console.log(db_prestamo);
        }

    } while (salir === true)








    
