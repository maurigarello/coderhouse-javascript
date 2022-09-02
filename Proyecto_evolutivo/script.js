let db_prestamo = [],
    new_prestamo = {},
    filtered_db = [],
    salir = false,
    evento_tres = document.getElementById("btn_tres_cuotas").addEventListener("click", tres_cuotas),
    evento_seis = document.getElementById("btn_seis_cuotas").addEventListener("click", seis_cuotas),
    evento_doce = document.getElementById("btn_doce_cuotas").addEventListener("click", doce_cuotas),
    filtro_tres = document.getElementById("btn_tres").addEventListener("click", filtrar_tres),
    filtro_seis = document.getElementById("btn_seis").addEventListener("click", filtrar_seis),
    filtro_doce = document.getElementById("btn_doce").addEventListener("click", filtrar_doce);


//declaro clase prestamo
class Prestamo {
    constructor(monto, cuotas, interes) {
        this.monto = monto;
        this.cuotas = cuotas;
        this.interes = monto * interes / 100;
        this.total = monto + this.interes;
    }
//fin del constructor

//metodo para obtener datos
get_datos() {
    alert(`Info sobre el préstamo solicitado:
            Monto: $` +this.monto + `
            Cuotas: ` +this.cuotas + `
            Total a pagar con interés: ` +this.total);
	}

// fin del metodo

// metodo para setear id

set_id() {
  for(let i = 0; i < db_prestamo.length; i++){
    const user = db_prestamo[i];
    user.id = i
  }
}

//fin del metodo

}
//fin de la clase

// //declaro mi clase user
// class user {
//   constructor(user, pass) {
//     this.user = user;
//     this.pass = pass;
//     this.id = 0;
//   }
// //fin del constructor
//}
//fin de la clase


// funcion para insertar en tabla *experimental*, tambien agrega eventos en los botones eliminar

function agregar_a_tabla() {
  for(p of filtered_db) {
    let new_tr = document.createElement("tr");
    new_tr.className = "lista";
    new_tr.innerHTML = (`<td>$${p.monto}</td><td>${p.cuotas}</td><td>$${p.total}</td><button class="delete">Eliminar</button>`);
    let tbody = document.getElementById("tbody");
    tbody.appendChild(new_tr);
  }
    botones_borrar = document.querySelectorAll(".delete");
    for(boton of botones_borrar) {
      boton.addEventListener("click", function(e) {
        let boton = e.target,
            tr = boton.parentNode;
            tr.remove();
      })
    }
}

//funcion para limpiar tabla cada vez que filtra

let limpiar_tabla = () => {
    let tbody = document.querySelectorAll(".lista");
    tbody.forEach(e => {
        e.parentNode.removeChild(e);
    });
  }

// funcion para recorrer array y filtrarlo

function filtrar_tres() {
  filtered_db = [];
  let presta_filter = db_prestamo.filter(e => e.cuotas === 3);
    presta_filter.forEach((e) => {
    filtered_db.push(e);
  });
  limpiar_tabla();
  agregar_a_tabla();
  }

function filtrar_seis() {
  filtered_db = [];
  let presta_filter = db_prestamo.filter(e => e.cuotas === 6);
    presta_filter.forEach((e) => {
    filtered_db.push(e);
  });
  limpiar_tabla();
  agregar_a_tabla();
  }

function filtrar_doce() {
  filtered_db = [];
  let presta_filter = db_prestamo.filter(e => e.cuotas === 12);
    presta_filter.forEach((e) => {
    filtered_db.push(e);
  });
  limpiar_tabla();
  agregar_a_tabla();
  }

// funciones de botones

function tres_cuotas() {
  monto = parseInt(document.getElementById("monto").value);
  if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
  new_prestamo = new Prestamo(monto, 3, 15);
  db_prestamo.push(new_prestamo);
  new_prestamo.get_datos();
  new_prestamo.set_id();  
}

function seis_cuotas() {
  monto = parseInt(document.getElementById("monto").value);
  if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
  new_prestamo = new Prestamo(monto, 6, 25);
  db_prestamo.push(new_prestamo);
  new_prestamo.get_datos();
  new_prestamo.set_id();  
}

function doce_cuotas() {
  monto = parseInt(document.getElementById("monto").value);
  if(Number.isNaN(monto)) return alert("Este simulador sólo admite números como parámetro");
  new_prestamo = new Prestamo(monto, 12, 35);
  db_prestamo.push(new_prestamo);
  new_prestamo.get_datos();
  new_prestamo.set_id();  
}


