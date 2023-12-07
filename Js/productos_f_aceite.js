const marcas_aceite = [
    { producto: "Aceite", marca: "Elaion", descripcion: "Mineral 15W40", precio: 17000,Image: "../Image/0023743351.jpg"},
    { producto: "Aceite", marca: "Elaion", descripcion: "Semisintetico 10W40", precio: 25000,Image: "../Image/0023743351.jpg"},
    { producto: "Aceite", marca: "Helix", descripcion: "Mineral 15W40", precio: 20000,Image: "../Image/0023743351.jpg" },
    { producto: "Aceite", marca: "Helix", descripcion: "Semisintetico 10W40", precio: 28000,Image: "../Image/0023743351.jpg"},
    { producto: "Aceite", marca: "Liqid Moly", descripcion: "Semisintetico 10W40", precio: 32000,Image: "../Image/0023743351.jpg"},
    { producto: "Aceite", marca: "Liqid Moly", descripcion: "Sintetico 5W30", precio: 39000,Image: "../Image/0023743351.jpg"},
];

let carrito = [];

function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.show();
    const modalBody = document.querySelector('#listaCarrito');
    modalBody.innerHTML = '';

    carrito.map(producto => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = `${producto.marca} - $${producto.precio} - ${producto.producto}`;
        modalBody.appendChild(listItem);
    });
}

function mostrarProductos() {
    const container = document.getElementById('contenedorProductos');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    container.style.justifyContent = 'center';
    container.innerHTML = '';

    marcas_aceite.map(producto => {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.style.width = '300px';
        card.style.margin = '20px';


        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const productName = document.createElement('h4');
        productName.classList.add('card-title');
        productName.style.fontSize = '25px';
        productName.style.textAlign = 'center';
        productName.style.padding = '10px';
        productName.style.textDecoration = 'none';
        productName.textContent = producto.marca;

        const productImage = document.createElement('img');
        productImage.classList.add('card-img-top');
        productImage.src = producto.Image;
        productImage.alt = `${producto.marca} - ${producto.producto}`;


        const productDescrition = document.createElement('p');
        productDescrition.classList.add('card-text');
        productDescrition.style.fontSize ='20px';
        productDescrition.textContent = `${producto.descripcion}`;

        const productPrice = document.createElement('p');
        productPrice.classList.add('card-text');
        productPrice.style.fontWeight = 'bold';
        productPrice.textContent = `$${producto.precio}`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al Carrito';
        addButton.classList.add('btn', 'btn-primary', 'mt-2');
        addButton.style.height ='60px';
        addButton.style.width = '250px';
        addButton.style.fontSize ='22px';
        addButton.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });

        cardBody.appendChild(productName);
        cardBody.appendChild(productImage);
        cardBody.appendChild(productDescrition);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(addButton);
        card.appendChild(cardBody);

        container.appendChild(card);
    });
}

// Llamada inicial para mostrar los productos
mostrarProductos();

document.getElementById('mostrarCarritoBtn').addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que se propague el evento de clic al cuerpo del documento
});

// Función para cerrar el modal del carrito
function cerrarCarritoModal() {
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.hide();
}


// Llamada inicial para mostrar los productos
mostrarProductos();

// Función para mostrar el carrito al hacer clic en el botón del carrito
document.getElementById('mostrarCarritoBtn').addEventListener('click', () => {
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.show();
    mostrarCarrito();
});

// Evento para cerrar el modal al hacer clic en el botón del carrito
document.getElementById('mostrarCarritoBtn').addEventListener('click', () => {
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.show();
    mostrarCarrito();
});

// Evento para cerrar el modal al hacer clic en el botón "Cerrar"
const closeButton = document.querySelector('.btn-secondary'); // Cambia el selector si es necesario
closeButton.addEventListener('click', cerrarCarritoModal);

// Evento para cerrar el modal al hacer clic en el botón "Finalizar Compra"
const finishButton = document.querySelector('.btn-primary'); // Cambia el selector si es necesario
finishButton.addEventListener('click', cerrarCarritoModal);

// Evento para cerrar el modal al hacer clic en el botón de cierre del modal
window.addEventListener('click', (event) => {
    const carritoModal = document.getElementById('carritoModal');
    if (event.target === carritoModal) {
        cerrarCarritoModal();
    }
});