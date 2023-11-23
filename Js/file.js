const precio_cambio_aceite = 0;
const marcas_aceite = [
    { marca: "elaion", precio: 17000 },
    { marca: "helix", precio: 20000 },
    { marca: "liqid_moly", precio: 28000 }
];
const marcas_filtro_aire = [
    { marca: "mann", precio: 4500 },
    { marca: "wega", precio: 6700 }
];
const marcas_filtro_nafta = [
    { marca: "mann", precio: 3000 },
    { marca: "wega", precio: 5500 }
];
const servicio = [
    { tipo: "Premium", precio: 10000 },
    { tipo: "Standar", precio: 5000 }
];

function pedirSeleccion(mensaje, opciones, callback) {
    let seleccion;
    do {
        seleccion = parseInt(prompt(mensaje));
    } while (isNaN(seleccion) || !callback(seleccion, opciones));
    return seleccion;
}

function validarSeleccion(seleccion, opciones) {
    return seleccion >= 1 && seleccion <= opciones;
}

const marcas_aceites = pedirSeleccion(
    "Marca de aceite:\n1. Elaion\n2. Helix\n3. Liqid Moly",
    marcas_aceite.length,
    validarSeleccion
);

let precio_total = precio_cambio_aceite;

if (validarSeleccion(marcas_aceites, marcas_aceite.length)) {
    marcas_aceite.forEach(function (marca, index) {
        if (index + 1 === marcas_aceites) {
            precio_total += marca.precio;
        }
    });
}

const marcas_filtro_aire1 = pedirSeleccion(
    "Marca de filtro de aire:\n1. Mann\n2. Wega",
    marcas_filtro_aire.length,
    validarSeleccion
);

if (validarSeleccion(marcas_filtro_aire1, marcas_filtro_aire.length)) {
    marcas_filtro_aire.forEach(function (marca, index) {
        if (index + 1 === marcas_filtro_aire1) {
            precio_total += marca.precio;
        }
    });
}

const marcas_filtro_nafta1 = pedirSeleccion(
    "Marca de filtro de nafta:\n1. Mann\n2. Wega",
    marcas_filtro_nafta.length,
    validarSeleccion
);

if (validarSeleccion(marcas_filtro_nafta1, marcas_filtro_nafta.length)) {
    marcas_filtro_nafta.forEach(function (marca, index) {
        if (index + 1 === marcas_filtro_nafta1) {
            precio_total += marca.precio;
        }
    });
}

const servicio1 = pedirSeleccion(
    "Servicio:\n1. Premium (40 min de demora)\n2. Standar (3 horas de demora)",
    servicio.length,
    validarSeleccion
);

if (validarSeleccion(servicio1, servicio.length)) {
    servicio.forEach(function (serv, index) {
        if (index + 1 === servicio1) {
            precio_total += serv.precio;
        }
    });
}

alert("El precio total es: " + precio_total + " pesos");