let votaciones = "",
    series = [
  {
    nombre: "The Office",
    votos: 0,
  },
  {
    nombre: "How I Met Your Mother",
    votos: 0,
  },
  {
    nombre: "The Big Bang Theory",
    votos: 0,
  },
  {
    nombre: "New Girl",
    votos: 0,
  },
];


do {
  votaciones = prompt("Se inician las votaciones, elija su letra: A, B, C o D");
  // Condición
  switch (votaciones) {
    // en el caso de recibir "A", suma uno al valor de votos: en the Office
    case "A":
      series[0].votos++
      alert("Has votado a " + series[0].nombre);
    break;
    // en el caso de recibir "B", suma uno al valor de votos: en How I Met Your Mother
    case "B":
      series[1].votos++
      alert("Has votado a " + series[1].nombre);
    break;
    // en el caso de recibir "C", suma uno al valor de votos: en The Big Bang Theory
    case "C":
      series[2].votos++
      alert("Has votado a " + series[2].nombre);
    break;
    // en el caso de recibir "A", suma uno al valor de votos: en New Girl
    case "D":
      series[3].votos++
      alert("Has votado a " + series[3].nombre);
    break;
    case "fin":
      alert("Has terminado la votación");
    break;
    default:
      alert("Tu voto es invalido");

	} 
} while (votaciones != "fin") 


// determina cual es la serie con mas votos
let sv = series.reduce(function (p, c) {
  return p.votos > c.votos ? p : c
  });
  
alert("La serie ganadora es: " +sv.nombre + " con la cantidad de: " +sv.votos + " votos" );





