document.addEventListener("DOMContentLoaded", () => {
  checkUser();
  ifLocalStorage();
  renderComanda();
  pushStoragePedidos();
  renderComandasCocina();
});



//** variables globales **//

let margarita_contador = 1;
let bacon_contador = 1;
let doble_contador = 1;
let hongos_contador = 1;
let pepperoni_contador = 1;
let mar_contador = 1;

let items_pedido = [];
let pedidos_de_alta = [];
let items = [];
let pedidos = [];
let pedidos_string;
let pedidos_parse;


//** clases **//

class Pizza {
  constructor(nombre, valor, id, cantidad) {
    this.nombre = nombre;
    this.valor = valor;
    this.id = id;
    this.cantidad = cantidad;
  }
}


//** items en DOM **//

let tbody = document.getElementById("tbody");
let botones_pizzas = document.getElementsByClassName("botones");
let div_general = document.getElementsByClassName("div_general");
let comanda = document.getElementById("comanda");
let enviar_pedido = document.getElementById("new_pedido").addEventListener("click", enviarPedido);
let boton_cocina = document.getElementById("cocina").addEventListener("click", mostrarOcultar);
let btn_cocina = document.getElementById("cocina");
let boton_mostrador = document.getElementById("mostrador").addEventListener("click", mostrarOcultar);
let btn_mostrador = document.getElementById("mostrador");
let lista_cocina = document.getElementById("lista_cocina");
let modal = document.getElementById("modal_usuario").addEventListener("click", modalUsuario);

//** FUNCIONES */

//** funcion para comprobar la cantidad de comandas true en cocina */

function checkComandaFlag() {
  const pedidos_true = pedidos.filter(e => e.flag === true);
  if (pedidos_true.length >= 12) {
    Swal.fire({
      icon: 'warning',
      title: 'Dale tiempo a los cocineros, estan con mucha demanda!',
      showConfirmButton: false,
      timer: 1500
      });
      return true;
  }
}

//** funcion para renderizar comandas luego de enviar pedido */

function renderAfterPedido() {
  lista_cocina.innerHTML = "";
  renderComandasCocina();
}

//** modal */

function modalUsuario() {
  Swal.fire({
    title: 'Deseas cambiar de usuario?',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Deslogueando!', '', 'success');
      window.location.href = "../login/login.html";
    }
  })
}

//** funcion para renderizar comandas en cocina */

function renderComandasCocina() {
  for (let item of pedidos) {
    if (item.flag === true) {
      lista_cocina.append(comandasCocina(item.nro_comanda));  
      let table_id = document.getElementById(item.nro_comanda);
      let pedido_items = [];
      pedido_items.push(item.items);
      pedido_items = pedido_items.flat(2);
      for (let pedido of pedido_items) {
        table_id.append(templateRow(pedido.nombre, pedido.cantidad));
      }
    } else if (item.flag === false) {
      pedidos_de_alta.push(item);
    }
  }
}

//** template para row de comanda */

function templateRow(valor, cantidad) {
  let tr = document.createElement("tr");
  tr.setAttribute("class", "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100");
  tr.innerHTML = `<td class="text-sm text-gray-900 font-light py-4 whitespace-nowrap">${valor}</td>
  <td class="text-sm text-gray-900 font-light py-4 whitespace-nowrap">${cantidad}</td>`;
  return tr;
}

//** template para comandas en cocina */

function comandasCocina(nro_comanda) {
  let new_li = document.createElement("li")
  new_li.innerHTML = `<a class="flex flex-col justify-between h-full p-8 transition bg-white border-4 border-black group rounded-xl hover:bg-red-200 hover:shadow-offset hover:shadow-black">
    <div class="flex">
      <button id="btn_alta_${nro_comanda}" class="text-xs font-medium text-white bg-lime-600 border-4 border-black hover:bg-lime-800 px-3 py-1.5">Alta</button>
      <span class="ml-auto text-xs font-medium text-white bg-black px-1 py-1.5">Com. NRO:${nro_comanda}</span>
    </div>
    <div class="mt-8">
      <table id="${nro_comanda}" class="min-w-full">
        <thead class="bg-white border-b">
        </thead>
      </table></div>
  </a>`;
return new_li;
}

//** funcion para mostrar y ocultar cocina, mostrador */

function mostrarOcultar(){
  if (this.id === "mostrador") {
    mostrarYOcultar("lista_mostrador","lista_cocina");
  } else if (this.id === "cocina") {
    mostrarYOcultar("lista_cocina", "lista_mostrador");
  }
}

function mostrarYOcultar(mostrar, ocultar) { 
  if (mostrar === "lista_mostrador") {
    let mostrar_mostrador = document.getElementById(mostrar);
    mostrar_mostrador.setAttribute("class", "flex flex-col items-center justify-center pt-20");
    btn_mostrador.parentNode.parentNode.setAttribute("class", "inline-block py-2 px-3 bg-gray-200 rounded-full");
    btn_cocina.parentNode.parentNode.setAttribute("class", "inline-block py-2 px-3 hover:bg-gray-200 rounded-full");
    let ocultar_cocina = document.getElementById(ocultar);
    ocultar_cocina.setAttribute("class", "pt-10 grid grid-rows-2 grid-cols-1 gap-4 sm:grid-cols-6 hidden");
  } else if (mostrar === "lista_cocina") {
    let mostrar_cocina = document.getElementById(mostrar);
    mostrar_cocina.setAttribute("class", "pt-10 grid grid-rows-2 grid-cols-1 gap-4 sm:grid-cols-6");
    btn_cocina.parentNode.parentNode.setAttribute("class", "inline-block py-2 px-3 bg-gray-200 rounded-full");
    btn_mostrador.parentNode.parentNode.setAttribute("class", "inline-block py-2 px-3 hover:bg-gray-200 rounded-full");
    let ocultar_mostrador = document.getElementById(ocultar);
    ocultar_mostrador.setAttribute("class", "flex flex-col items-center justify-center pt-20 hidden");
  }
}

/** funcion para boton enviar pedido */

function enviarPedido() {
  if (items.length == 0) {
    Swal.fire({
      icon: 'warning',
      title: 'No trollees a los cocineros! No ingresaste nada.',
      showConfirmButton: false,
      timer: 1500
      });
  } else if (checkComandaFlag() === true) {
    checkComandaFlag();
  } else {
    pedidos.push(pedido(items, monto(), comanda.innerText, true));
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    limpiarComanda();
    renderAfterPedido();
    Swal.fire({
      icon: 'success',
      title: 'Pedido enviado a Cocina!',
      showConfirmButton: false,
      timer: 1500
    });
  }
}

//** funcion para limpiar la comanda */

function limpiarComanda(){
  tbody.innerHTML = '';
  items = [];
  comanda.innerText = parseFloat(comanda.innerText) + 1;

  //** resetear contadores de pizzas para evitar bugs */

  margarita_contador = 1;
  bacon_contador = 1;
  doble_contador = 1;
  hongos_contador = 1;
  pepperoni_contador = 1;
  mar_contador = 1;
}

//** pushea los pedidos desde localstorage para manejarlos en un array */

function pushStoragePedidos() {
  if (localStorage.getItem("pedidos") === null) {
  } else {
    pedidos.push(JSON.parse(localStorage.getItem("pedidos")));
    pedidos = pedidos.flat(2);
  }
}

//** renderiza el numero de comanda */

function renderComanda() {
  if (localStorage.getItem("pedidos") === null) {
    comanda.innerText = 1;
  } else {
    pedidos_parse = JSON.parse(localStorage.getItem("pedidos"));
    comanda.innerText = parseFloat(pedidos_parse[pedidos_parse.length-1].nro_comanda) + 1;
  }
}

//** un template de un objeto pedido */

function pedido(items, monto, nro_comanda, flag) {
  let template = {
      "monto": monto,
      "items": items,
      "nro_comanda": nro_comanda,
      "flag": flag
    }
  return template;
}

//** para sumar el monto de la lista */

function monto() {
  let valor_pedido = 0;
  for (let item of items) {
    valor_pedido = valor_pedido + item.valor;
  }
  return valor_pedido;
}

//** chequear si el navegador es compatible con persistencia */

function ifLocalStorage() {
  if (typeof(Storage) !== "undefined") {
} else {
  Swal.fire({
    icon: 'warning',
    title: 'Tu navegador no cuenta con Localstorage, por lo cual no podrás tener persistencia!',
    showConfirmButton: false,
    timer: 1500
    });
    setTimeout(()=> {
      window.location.href = "../index.html";
    }, "2000");
  }
}

//** pushear las pizzas dentro de la tabla en el array items */

function pushItems(nombre, valor, id) {
  const indice = items.findIndex( e => e.nombre == nombre);
  if (indice === -1) {
    items.push(new Pizza(nombre, valor, id, 1));
  } else {
    items[indice].cantidad++;
    items[indice].valor += valor;
  }
}

//** chequear si usuario esta registrado para ver la web */

function checkUser() {
	const checkUser = document.getElementById("actualUser")
	checkUser.textContent = `Usuario: ${localStorage.getItem("mailActual")}`
	if (localStorage.getItem("mailActual") === null) {
		Swal.fire({
			icon: 'warning',
			title: 'Epa pilluelo! no te registraste.',
			showConfirmButton: false,
			timer: 2000
		  });
      setTimeout(()=> {
        window.location.href = "../login/login.html";
      }, "2000");
	}
}

//** renderizado de botones desde json **//

fetch("./base_datos/db.json")
  .then((res) => res.json())
  .then((data) => {
    for (let div of div_general) {
      for (let pizza of data) {
        let boton = document.createElement("span");
        boton.innerHTML = `<button id="${pizza.id}" class="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] botones shadow-xl botones bg-blue-600 h-20 w-20 bg-cover 
        bg-[url('${pizza.img}')] rounded-full"></button>`;
        div.append(boton);
      }
    }
  

//** escucha de botones y respectiva funcionalidad *//

for (let boton of botones_pizzas) {
   boton.addEventListener("click", insert);
}


/** funcion con template a insertar */

function check(nombre, contador, valor, cantidad_pizza, valor_pizza) {
    row = document.createElement("tr");
    row.setAttribute("class", "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100");
    row.innerHTML = `<td	class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
			<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${nombre}</td>
			<td	id="cantidad_${cantidad_pizza}" class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${contador}</td>
			<td	id="valor_${valor_pizza}" class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${valor}</td>`
      return row;
}

//** otro template para no hacer DRY */

function check_dos(cantidad_pizza, valor_pizza, pizza_contador, valor_total) {
  document.getElementById(cantidad_pizza).innerHTML = `${pizza_contador}`;
  document.getElementById(valor_pizza).innerHTML = `${valor_total}`;
}


//** funcion para renderizar el template con sus respectivos valores */

function insert() {

  /**margarita */

  if(this.id == 0 && margarita_contador === 1) {
    let new_row = check(data[this.id].nombre, margarita_contador, data[this.id].valor, "margarita", "margarita");
    tbody.append(new_row);
    pushItems("margarita", 1200, 0);
    margarita_contador++;
    return

  } else if(this.id == 0 && margarita_contador > 1) {
    check_dos("cantidad_margarita", "valor_margarita", margarita_contador, data[this.id].valor * margarita_contador);
    pushItems("margarita", 1200, 0);
    margarita_contador++;
    return
  }

  /**bacon */

  if(this.id == 1 && bacon_contador === 1) {
    let new_row = check(data[this.id].nombre, bacon_contador, data[this.id].valor, "bacon", "bacon");
    tbody.append(new_row);
    pushItems("bacon", 1500, 1);
    bacon_contador++;
    return

  } else if(this.id == 1 && bacon_contador > 1) {
    check_dos("cantidad_bacon", "valor_bacon", bacon_contador, data[this.id].valor * bacon_contador);
    pushItems("bacon", 1500, 1);
    bacon_contador++;
    return
  }

  /**doble */

  if(this.id == 2 && doble_contador === 1) {
    let new_row = check(data[this.id].nombre, doble_contador, data[this.id].valor, "doble", "doble");
    tbody.append(new_row);
    pushItems("doble", 1500, 2);
    doble_contador++;
    return

  } else if(this.id == 2 && doble_contador > 1) {
    check_dos("cantidad_doble", "valor_doble", doble_contador, data[this.id].valor * doble_contador);
    pushItems("doble", 1500, 2);
    doble_contador++;
    return
  }

  /**hongos */

  if(this.id == 3 && hongos_contador === 1) {
    let new_row = check(data[this.id].nombre, hongos_contador, data[this.id].valor, "hongos", "hongos");
    tbody.append(new_row);
    pushItems("hongos", 1600, 3);
    hongos_contador++;
    return

  } else if(this.id == 3 && hongos_contador > 1) {
    check_dos("cantidad_hongos", "valor_hongos", hongos_contador, data[this.id].valor * hongos_contador);
    pushItems("hongos", 1600, 3);
    hongos_contador++;
    return
  }

  /**pepperoni */

  if(this.id == 4 && pepperoni_contador === 1) {
    let new_row = check(data[this.id].nombre, pepperoni_contador, data[this.id].valor, "pepperoni", "pepperoni");
    tbody.append(new_row);
    pushItems("pepperoni", 1800, 4);
    pepperoni_contador++;
    return

  } else if(this.id == 4 && pepperoni_contador > 1) {
    check_dos("cantidad_pepperoni", "valor_pepperoni", pepperoni_contador, data[this.id].valor * pepperoni_contador);
    pushItems("pepperoni", 1800, 4);
    pepperoni_contador++;
    return
  }

  /**mar */

  if(this.id == 5 && mar_contador === 1) {
    let new_row = check(data[this.id].nombre, mar_contador, data[this.id].valor, "mar", "mar");
    tbody.append(new_row);
    pushItems("mar", 1800, 5);
    mar_contador++;
    return

  } else if(this.id == 5 && mar_contador > 1) {
    check_dos("cantidad_mar", "valor_mar", mar_contador, data[this.id].valor * mar_contador);
    pushItems("mar", 1800, 5);
    mar_contador++;
    return
  }

}

/** fin del fetch **/
});