let carrito = [];

let carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];

if (carritoStorage && carritoStorage.length >= 1) {
    const continuarCompraModal = new bootstrap.Modal(document.getElementById('confirmarCompraModal'));

    continuarCompraModal.show();

    document.getElementById('confirmarCompraBtn').addEventListener('click', () => {
        continuarCompraModal.hide();
        carrito = carritoStorage;
        mostrarCarrito();
    });
    document.getElementById('cancelarCompraBtn').addEventListener('click', () => {
        continuarCompraModal.hide();
        localStorage.clear(carrito);
        window.location.href = "../index.html";
    });
} else {
    console.log("Continuar");
}
function guardarCarritoLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
function agregarAlCarrito(producto) {
    carrito.push(producto);
    mostrarCarrito();
    guardarCarritoLocalStorage();
    mostrarProductosEnCarrito();
}
const marcas_aceite = [
    { producto: "Aceite", marca: "Elaion", descripcion: "Mineral 15W40", precio: 17000,Image: "../Image/elaion_15w40.webp"},
    { producto: "Aceite", marca: "Elaion", descripcion: "Semisintetico 10W40", precio: 25000,Image: "../Image/elaion_10w40.webp"},
    { producto: "Aceite", marca: "Helix", descripcion: "Mineral 15W40", precio: 20000,Image: "../Image/helix_15w40.webp" },
    { producto: "Aceite", marca: "Helix", descripcion: "Semisintetico 10W40", precio: 28000,Image: "../Image/helix_10w40.webp"},
    { producto: "Aceite", marca: "Liqid Moly", descripcion: "Semisintetico 10W40", precio: 32000,Image: "../Image/liqid_moly_10w40.webp"},
    { producto: "Aceite", marca: "Liqid Moly", descripcion: "Sintetico 5W30", precio: 39000,Image: "../Image/liqid_moly_5w30.webp"},
];
function mostrarCarrito() {
    const modalBody = document.querySelector('#listaCarrito');
    modalBody.innerHTML = '';

    carrito.map((producto, index) => {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.innerHTML = `
        ${producto.producto} - $${producto.precio} - ${producto.marca} - ${producto.descripcion}
        <span class="fas fa-trash-alt float-right" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span>
        `;
        modalBody.appendChild(item);
    });

    const total = carrito.reduce((accumulator, producto) => accumulator + producto.precio, 0);

    const totalElement = document.createElement('div');
    totalElement.classList.add('total-carrito');
    totalElement.innerHTML = `
        <hr>
        <p class="text-left font-weight-bold">Total</p>
        <p class="text-right textealing-rigth font-weight-bold">$${total}</p>`;
    modalBody.appendChild(totalElement);

    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.show();
}
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarritoLocalStorage();
    window.location.reload();
    mostrarCarrito();
}
function cerrarCarritoModal() {
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.hide();
}
function filtrarProductos(texto, marca, productos) {
    const textoBusqueda = (typeof texto === 'string') ? texto.trim().toLowerCase() : '';
    if (textoBusqueda === '') {
        return productos; 
    }
    return productos.filter(producto =>
        producto.marca.toLowerCase().includes(textoBusqueda)
    );
}
function mostrarProductos(productos) {
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

        const productoNombre = document.createElement('h4');
        productoNombre.classList.add('card-title');
        productoNombre.style.fontSize = '25px';
        productoNombre.style.textAlign = 'center';
        productoNombre.style.padding = '10px';
        productoNombre.style.textDecoration = 'none';
        productoNombre.textContent = producto.marca;

        const productoImagen = document.createElement('img');
        productoImagen.classList.add('card-img-top');
        productoImagen.src = producto.Image;
        productoImagen.alt = `${producto.marca} - ${producto.producto}`;


        const productoDescripcion = document.createElement('p');
        productoDescripcion.classList.add('card-text');
        productoDescripcion.style.fontSize ='20px';
        productoDescripcion.textContent = `${producto.descripcion}`;

        const productoPrecio = document.createElement('p');
        productoPrecio.classList.add('card-text');
        productoPrecio.style.fontWeight = 'bold';
        productoPrecio.textContent = `$${producto.precio}`;

        const agregarBoton = document.createElement('button');
        agregarBoton.textContent = 'Agregar al Carrito';
        agregarBoton.classList.add('btn', 'btn-primary', 'mt-2');
        agregarBoton.style.height ='60px';
        agregarBoton.style.width = '250px';
        agregarBoton.style.fontSize ='22px';
        agregarBoton.addEventListener('click', () => {
            agregarAlCarrito(producto);
        });

        cardBody.appendChild(productoNombre);
        cardBody.appendChild(productoImagen);
        cardBody.appendChild(productoDescripcion);
        cardBody.appendChild(productoPrecio);
        cardBody.appendChild(agregarBoton);
        card.appendChild(cardBody);
        container.appendChild(card);
    });
}
mostrarProductos();

function cerrarCarritoModal() {
    const carritoModal = new bootstrap.Modal(document.getElementById('carritoModal'));
    carritoModal.hide();
}
document.getElementById('botonCerrar').addEventListener('click', () =>{
    cerrarCarritoModal();
});
document.getElementById('botonFinalizar').addEventListener('click', () =>{
    localStorage.clear(carrito);
    cerrarCarritoModal();
    const graciasModal = new bootstrap.Modal(document.getElementById('graciasModal'));
    graciasModal.show();
});
document.getElementById('continuarBtn').addEventListener('click', () => {
    window.location.href = "../index.html";
});
function actualizarProductos() {
    const textoBusqueda = document.getElementById('buscadorProducto').value;
    const productosFiltrados = filtrarProductos(textoBusqueda, '', marcas_aceite);
    mostrarProductos(productosFiltrados);
}
// document.getElementById('buscadorProducto').addEventListener('input', actualizarProductos);

document.getElementById("buscadorProducto").addEventListener("input", () => {
    filtrarProductos(document.getElementById("buscadorProducto").value, '', marcas_aceite);
});
document.getElementById('buscarButton').addEventListener('click', () => {
    actualizarProductos();
});
function toggleCarrito() {
    const carritoProductos = document.getElementById('carritoProductos');
    const botonMinimizarMaximizar = document.getElementById('botonMinimizarMaximizar');
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carritoProductos.childNodes.length > 0) {
        const total = carritoStorage.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        carritoProductos.textContent = `Total: $${total}`;
        botonMinimizarMaximizar.textContent = '+';
        localStorage.setItem('carritoMinimizado', true);
    } else {
        mostrarProductosEnCarrito();
        botonMinimizarMaximizar.textContent = '-';
        localStorage.removeItem('carritoMinimizado');
    }
}
function toggleCarrito() {
    const carritoProductos = document.getElementById('carritoProductos');
    const botonMinimizarMaximizar = document.getElementById('botonMinimizarMaximizar');
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carritoProductos.style.display === 'none') {
        carritoProductos.style.display = 'block';
        mostrarProductosEnCarrito(carritoStorage);
        botonMinimizarMaximizar.textContent = '-';
    } else {
        carritoProductos.style.display = 'none';
        const total = carritoStorage.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        carritoProductos.textContent = `Total: $${total}`;
        botonMinimizarMaximizar.textContent = '+';
    }
}
function mostrarProductosEnCarrito(carrito) {
    const carritoProductos = document.getElementById('carritoProductos');
    carritoProductos.innerHTML = '';

    carrito.map((producto, index) => {
        const item = document.createElement('li');
        item.textContent = `${producto.producto} - ${producto.marca} - ${producto.descripcion} - $${producto.precio}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
        botonEliminar.style.backgroundColor = '#ccc';
        botonEliminar.style.border = 'none';
        botonEliminar.style.float = 'right'
        botonEliminar.addEventListener('click', () => eliminarProducto(index));
        
        item.appendChild(botonEliminar);
        carritoProductos.appendChild(item);
    });

    const lineaDivisoria = document.createElement('hr');
    carritoProductos.appendChild(lineaDivisoria);

    const total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);
    const totalElement = document.createElement('li');
    totalElement.textContent = `Total: $${total}`;
    carritoProductos.appendChild(totalElement);
}
function eliminarProducto(index) {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (index >= 0 && index < carritoStorage.length) {
        carritoStorage.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carritoStorage));
        mostrarProductosEnCarrito(carritoStorage);
        eliminarDelCarrito(index);
    }
}
function inicializarCarrito() {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    const botonMinimizarMaximizar = document.getElementById('botonMinimizarMaximizar');
    const carritoProductos = document.getElementById('carritoProductos');

    if (carritoStorage.length === 0 || localStorage.getItem('carritoMinimizado')) {
        carritoProductos.style.display = 'none';
        const total = carritoStorage.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        carritoProductos.textContent = `Total: $${total}`;
        botonMinimizarMaximizar.textContent = '+';
    } else {
        mostrarProductosEnCarrito(carritoStorage);
        botonMinimizarMaximizar.textContent = '-';
    }
}
inicializarCarrito();

mostrarProductos(marcas_aceite);

