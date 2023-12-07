// const precio_cambio_aceite = 0;
// const marcas_aceite = [
//     { marca: "elaion", precio: 17000 },
//     { marca: "helix", precio: 20000 },
//     { marca: "liqid_moly", precio: 28000 }
// ];
// const marcas_filtro_aire = [
//     { marca: "mann", precio: 4500 },
//     { marca: "wega", precio: 6700 }
// ];
// const marcas_filtro_aceite = [
//     { marca: "mann", precio: 3000 },
//     { marca: "wega", precio: 5500 }
// ];
// const servicio = [
//     { tipo: "Premium", precio: 10000 },
//     { tipo: "Standar", precio: 5000 }
// ];

// function pedirSeleccion(mensaje, opciones, callback) {
//     let seleccion;
//     do {
//         seleccion = parseInt(prompt(mensaje));
//     } while (isNaN(seleccion) || !callback(seleccion, opciones));
//     return seleccion;
// }

// function validarSeleccion(seleccion, opciones) {
//     return seleccion >= 1 && seleccion <= opciones;
// }

// const marcas_aceites = pedirSeleccion(
//     "Marca de aceite:\n1. Elaion\n2. Helix\n3. Liqid Moly",
//     marcas_aceite.length,
//     validarSeleccion
// );

// let precio_total = precio_cambio_aceite;

// if (validarSeleccion(marcas_aceites, marcas_aceite.length)) {
//     marcas_aceite.forEach(function (marca, index) {
//         if (index + 1 === marcas_aceites) {
//             precio_total += marca.precio;
//         }
//     });
// }

// const marcas_filtro_aire1 = pedirSeleccion(
//     "Marca de filtro de aire:\n1. Mann\n2. Wega",
//     marcas_filtro_aire.length,
//     validarSeleccion
// );

// if (validarSeleccion(marcas_filtro_aire1, marcas_filtro_aire.length)) {
//     marcas_filtro_aire.forEach(function (marca, index) {
//         if (index + 1 === marcas_filtro_aire1) {
//             precio_total += marca.precio;
//         }
//     });
// }

// const marcas_filtro_aceite1 = pedirSeleccion(
//     "Marca de filtro de aceite:\n1. Mann\n2. Wega",
//     marcas_filtro_aceite.length,
//     validarSeleccion
// );

// if (validarSeleccion(marcas_filtro_aceite1, marcas_filtro_aceite.length)) {
//     marcas_filtro_aceite.forEach(function (marca, index) {
//         if (index + 1 === marcas_filtro_aceite1) {
//             precio_total += marca.precio;
//         }
//     });
// }

// const servicio1 = pedirSeleccion(
//     "Servicio:\n1. Premium (40 min de demora)\n2. Standar (3 horas de demora)",
//     servicio.length,
//     validarSeleccion
// );

// if (validarSeleccion(servicio1, servicio.length)) {
//     servicio.forEach(function (serv, index) {
//         if (index + 1 === servicio1) {
//             precio_total += serv.precio;
//         }
//     });
// }

// alert("El precio total es: " + precio_total + " pesos");






//////////////////////////////////////////////////////////////////////////////////////////













// Datos de productos
const marcas_aceite = [
    { producto: "Aceite", marca: "Elaion", precio: 17000},
    { marca: "helix", precio: 20000 },
    { marca: "liqid_moly", precio: 28000 }
];
const marcas_filtro_aire = [
    { marca: "mann", precio: 4500 },
    { marca: "wega", precio: 6700 }
];
const marcas_filtro_aceite = [
    { marca: "mann", precio: 3000 },
    { marca: "wega", precio: 5500 }
];

let carrito = []; // Array para almacenar los productos del carrito

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
}

// Función para mostrar el carrito en el modal
function mostrarCarrito() {
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal._element.addEventListener('shown.bs.modal', function () {
        const modalBody = document.querySelector('#listaCarrito');
        modalBody.innerHTML = '';

        carrito.forEach(producto => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `${producto.marca} - $${producto.precio}`;
            modalBody.appendChild(listItem);
        });
    });

    carritoModal.show();
}

// Función para filtrar productos
function filtrarProductos() {
    const textoBusqueda = document.getElementById("buscadorProducto").value.toLowerCase();
    const productosFiltrados = [...marcas_aceite, ...marcas_filtro_aire, ...marcas_filtro_aceite].filter(producto =>
        producto.marca.toLowerCase().includes(textoBusqueda)
    );
    mostrarProductos(productosFiltrados);
}

// Función para mostrar los productos en el contenedor
function mostrarProductos(productos = [...marcas_aceite, ...marcas_filtro_aire, ...marcas_filtro_aceite]) {
    const container = document.getElementById('contenedorProductos');
    container.innerHTML = '';

    if (productos.length === 0) {
        container.innerHTML = 'No se encontraron productos.';
        return;
    }

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.style.width = '400px'; // Ancho de la tarjeta

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const productName = document.createElement('h5');
        productName.classList.add('card-title');
        productName.textContent = producto.marca;

        const productPrice = document.createElement('p');
        productPrice.classList.add('card-text');
        productPrice.textContent = `$${producto.precio}`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al Carrito';
        addButton.classList.add('btn', 'btn-primary', 'mt-2');
        addButton.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });

        cardBody.appendChild(productName);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(addButton);
        card.appendChild(cardBody);

        container.appendChild(card);
    });
}
mostrarProductos();

// // Evento al hacer clic en el botón de búsqueda
// document.querySelector('#buscarButton').addEventListener('click', filtrarProductos);

// // Evento al presionar "Enter" en el campo de búsqueda
// document.getElementById('buscadorProducto').addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//         filtrarProductos();
//     }
// });

// // Función para mostrar el carrito al hacer clic en el botón del carrito
// document.getElementById('mostrarCarritoBtn').addEventListener('click', mostrarCarrito);

// // Estilos de botones y tarjetas
// const botonesAgregar = document.querySelectorAll('.btn-agregar');
// botonesAgregar.forEach((boton) => {
//     boton.classList.add('btn', 'btn-danger'); // Color rojo
//     boton.style.color = 'red'; // Color del texto
//     boton.style.borderRadius = '4px'; // Borde redondeado
// });

// const tarjetasProducto = document.querySelectorAll('.card');
// tarjetasProducto.forEach((tarjeta) => {
//     tarjeta.classList.add('card', 'bg-light', 'mb-3'); // Fondo de tarjeta
//     tarjeta.style.width = '100px'; // Ancho de la tarjeta
//     tarjeta.style.borderRadius = '4px'; // Borde redondeado
// });



/////////////////////////////////////////////////////////





// const marcas_aceite = [
//     { producto: "Aceite", marca: "Elaion", descripcion: "Mineral 15W40", precio: 17000,Image: "../Image/0023743351.jpg"},
//     { producto: "Aceite", marca: "Elaion", descripcion: "Semisintetico 10W40", precio: 25000,Image: "../Image/0023743351.jpg"},
//     { producto: "Aceite", marca: "Helix", descripcion: "Mineral 15W40", precio: 20000,Image: "../Image/0023743351.jpg" },
//     { producto: "Aceite", marca: "Helix", descripcion: "Semisintetico 10W40", precio: 28000,Image: "../Image/0023743351.jpg"},
//     { producto: "Aceite", marca: "Liqid Moly", descripcion: "Semisintetico 10W40", precio: 32000,Image: "../Image/0023743351.jpg"},
//     { producto: "Aceite", marca: "Liqid Moly", descripcion: "Sintetico 5W30", precio: 39000,Image: "../Image/0023743351.jpg"},
// ];

// let carrito = [];

// function agregarAlCarrito(producto) {
//     carrito.push(producto);
//     mostrarCarrito();
// }

// function mostrarCarrito() {
//     const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
//     carritoModal.show();
//     const modalBody = document.querySelector('#listaCarrito');
//     modalBody.innerHTML = '';

//     carrito.map(producto => {
//         const listItem = document.createElement('li');
//         listItem.classList.add('list-group-item');
//         listItem.textContent = `${producto.marca} - $${producto.precio} - ${producto.producto}`;
//         modalBody.appendChild(listItem);
//     });
// }

// function mostrarProductos() {
//     const container = document.getElementById('contenedorProductos');
//     container.style.display = 'flex';
//     container.style.flexWrap = 'wrap';
//     container.style.justifyContent = 'center';
//     container.innerHTML = '';

//     marcas_aceite.map(producto => {
//         const card = document.createElement('div');
//         card.classList.add('card', 'mb-3');
//         card.style.width = '300px';
//         card.style.margin = '20px';


//         const cardBody = document.createElement('div');
//         cardBody.classList.add('card-body');

//         const productName = document.createElement('h4');
//         productName.classList.add('card-title');
//         productName.style.fontSize = '25px';
//         productName.style.textAlign = 'center';
//         productName.style.padding = '10px';
//         productName.style.textDecoration = 'none';
//         productName.textContent = producto.marca;

//         const productImage = document.createElement('img');
//         productImage.classList.add('card-img-top');
//         productImage.src = producto.Image;
//         productImage.alt = `${producto.marca} - ${producto.producto}`;


//         const productDescrition = document.createElement('p');
//         productDescrition.classList.add('card-text');
//         productDescrition.style.fontSize ='20px';
//         productDescrition.textContent = `${producto.descripcion}`;

//         const productPrice = document.createElement('p');
//         productPrice.classList.add('card-text');
//         productPrice.style.fontWeight = 'bold';
//         productPrice.textContent = `$${producto.precio}`;

//         const addButton = document.createElement('button');
//         addButton.textContent = 'Agregar al Carrito';
//         addButton.classList.add('btn', 'btn-primary', 'mt-2');
//         addButton.style.height ='60px';
//         addButton.style.width = '250px';
//         addButton.style.fontSize ='22px';
//         addButton.addEventListener('click', () => {
//             agregarAlCarrito(producto);
//         });

//         cardBody.appendChild(productName);
//         cardBody.appendChild(productImage);
//         cardBody.appendChild(productDescrition);
//         cardBody.appendChild(productPrice);
//         cardBody.appendChild(addButton);
//         card.appendChild(cardBody);

//         container.appendChild(card);
//     });
// }

// // Llamada inicial para mostrar los productos
// mostrarProductos();

// document.getElementById('mostrarCarritoBtn').addEventListener('click', (event) => {
//     event.stopPropagation(); // Evita que se propague el evento de clic al cuerpo del documento
// });

// // Función para cerrar el modal del carrito
// function cerrarCarritoModal() {
//     const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
//     carritoModal.hide();
// }


// // Llamada inicial para mostrar los productos
// mostrarProductos();

// // Función para mostrar el carrito al hacer clic en el botón del carrito
// document.getElementById('mostrarCarritoBtn').addEventListener('click', () => {
//     const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
//     carritoModal.show();
//     mostrarCarrito();
// });

// // Evento para cerrar el modal al hacer clic en el botón del carrito
// document.getElementById('mostrarCarritoBtn').addEventListener('click', () => {
//     const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
//     carritoModal.show();
//     mostrarCarrito();
// });

// // Evento para cerrar el modal al hacer clic en el botón "Cerrar"
// const closeButton = document.querySelector('.btn-secondary'); // Cambia el selector si es necesario
// closeButton.addEventListener('click', cerrarCarritoModal);

// // Evento para cerrar el modal al hacer clic en el botón "Finalizar Compra"
// const finishButton = document.querySelector('.btn-primary'); // Cambia el selector si es necesario
// finishButton.addEventListener('click', cerrarCarritoModal);

// // Evento para cerrar el modal al hacer clic en el botón de cierre del modal
// window.addEventListener('click', (event) => {
//     const carritoModal = document.getElementById('carritoModal');
//     if (event.target === carritoModal) {
//         cerrarCarritoModal();
//     }
// });