const precio_cambio_aceite = 0;
const marcas_aceite = {
  "elaion": 17000,
  "helix": 20000,
  "liqid_moly": 28000,
};
const marcas_filtro_aire = {
  "mann": 4500,
  "wega": 6700,
};
const marcas_filtro_nafta = {
  "mann": 3000,
  "wega": 5500,
};
const servicio = {
  "Premium": 10000,
  "Standar": 5000,
};

function pedirSeleccion(mensaje, opciones) {
  let seleccion;
  do {
    seleccion = parseInt(prompt(mensaje));
  } while (isNaN(seleccion) || seleccion < 1 || seleccion > opciones);
  return seleccion;
}

const marcas_aceites = pedirSeleccion("Marca de aceite:\n1. Elaion\n2. Helix\n3. Liqid Moly", 3);

let precio_total = precio_cambio_aceite; 

if (marcas_aceites === 1) {
  precio_total += marcas_aceite["elaion"];
} else if (marcas_aceites === 2) {
  precio_total += marcas_aceite["helix"];
} else if (marcas_aceites === 3) {
  precio_total += marcas_aceite["liqid_moly"];
} else {
  alert("Marca de aceite no válida");
}

const marcas_filtro_aire1 = pedirSeleccion("Marca de filtro de aire:\n1. Mann\n2. Wega", 2);

if (marcas_filtro_aire1 === 1) {
  precio_total += marcas_filtro_aire["mann"];
} else if (marcas_filtro_aire1 === 2) {
  precio_total += marcas_filtro_aire["wega"];
} else {
  alert("Marca de Filtro de Aire no válida");
}

const marcas_filtro_nafta1 = pedirSeleccion("Marca de filtro de nafta:\n1. Mann\n2. Wega", 2);

if (marcas_filtro_nafta1 === 1) {
  precio_total += marcas_filtro_nafta["mann"];
} else if (marcas_filtro_nafta1 === 2) {
  precio_total += marcas_filtro_nafta["wega"];
} else {
  alert("Marca de filtro de nafta no válida");
}

const servicio1 = pedirSeleccion("Servicio:\n1. Premium (40 min de demora)\n2. Standar (3 horas de demora)", 2);

if (servicio1 === 1) {
  precio_total += servicio["Premium"];
} else if (servicio1 === 2) {
  precio_total += servicio["Standar"];
} else {
  alert("servicio no válido");
}

alert("El precio total es: " + precio_total + " pesos");


