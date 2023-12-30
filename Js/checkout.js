function obtenerProductosLocalStorage() {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    return carritoStorage;
}

function mostrarProductosEnOrderInfo() {
    const productos = obtenerProductosLocalStorage();
    const productsContainer = document.getElementById('products-container');
    const shippingCost = 5000; 

    productsContainer.innerHTML = '';

    let totalPrice = 0; 

    productos.map((producto, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        const productInfo = document.createElement('p');
        productInfo.textContent = `${producto.marca} - ${producto.descripcion} - $${producto.precio}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => eliminarProductoDelCarrito(index));

        productItem.appendChild(productInfo);
        productItem.appendChild(deleteButton);
        productsContainer.appendChild(productItem);

        totalPrice += producto.precio; 
    });
    totalPrice += shippingCost;

    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = `$${totalPrice}`;
}
function eliminarProductoDelCarrito(index) {
    const productos = obtenerProductosLocalStorage();
    
    if (index >= 0 && index < productos.length) {
        productos.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(productos));
        mostrarProductosEnOrderInfo();

        if (productos.length === 0) {
            window.location.href = '../pages/productos.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarProductosEnOrderInfo();
});
let cardDrop = document.getElementById('card-dropdown');
let activeDropdown;
cardDrop.addEventListener('click',function(){
let node;
for (let i = 0; i < this.childNodes.length-1; i++)
node = this.childNodes[i];
if (node.className === 'dropdown-select') {
    node.classList.add('visible');
    activeDropdown = node; 
};
})
window.onclick = function(e) {
    if (e.target.tagName === 'LI' && activeDropdown){
    if (e.target.innerHTML === 'Master Card') {
        document.getElementById('credit-card-image').src = 'https://dl.dropboxusercontent.com/s/2vbqk5lcpi7hjoc/MasterCard_Logo.svg.png';
            activeDropdown.classList.remove('visible');
        activeDropdown = null;
        e.target.innerHTML = document.getElementById('current-card').innerHTML;
        document.getElementById('current-card').innerHTML = 'Master Card';
    }
    else if (e.target.innerHTML === 'American Express') {
            document.getElementById('credit-card-image').src = 'https://dl.dropboxusercontent.com/s/f5hyn6u05ktql8d/amex-icon-6902.png';
            activeDropdown.classList.remove('visible');
        activeDropdown = null;
        e.target.innerHTML = document.getElementById('current-card').innerHTML;
        document.getElementById('current-card').innerHTML = 'American Express';      
    }
    else if (e.target.innerHTML === 'Visa') {
            document.getElementById('credit-card-image').src = 'https://dl.dropboxusercontent.com/s/ubamyu6mzov5c80/visa_logo%20%281%29.png';
            activeDropdown.classList.remove('visible');
        activeDropdown = null;
        e.target.innerHTML = document.getElementById('current-card').innerHTML;
        document.getElementById('current-card').innerHTML = 'Visa';
    }
    }
    else if (e.target.className !== 'dropdown-btn' && activeDropdown) {
    activeDropdown.classList.remove('visible');
    activeDropdown = null;
    }
    }

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('checkFormulario');
    const inputs = formulario.querySelectorAll('input');
    
    const expresiones = {
        numeroTarjeta: /^\d{16}$/, 
        nombreTitular: /^[a-zA-ZÀ-ÿ\s]{4,30}$/,
        expira: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 
        cvv: /^\d{3,4}$/, 
    };

    const validarCampo = (expresion, valor) => expresion.test(valor);

    inputs.forEach(input => {
        const icono = document.createElement('i');
        icono.classList.add('fa', 'check-icon');
        input.insertAdjacentElement('afterend', icono);

        input.addEventListener('keyup', function () {
            const esValido = validarCampo(expresiones[input.name], input.value.trim());
            mostrarIcono(input, esValido);
        });

        input.addEventListener('blur', function () {
            const esValido = validarCampo(expresiones[input.name], input.value.trim());
            mostrarIcono(input, esValido);
        });
    });

    const mostrarIcono = (input, esValido) => {
        const icono = input.nextElementSibling; 
        icono.classList.remove('fa-check', 'fa-times');
        icono.classList.add(esValido ? 'fa-check' : 'fa-times');
        icono.style.color = esValido ? 'green' : 'grey';
    };

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        let formValido = true;

        inputs.forEach(input => {
            const esValido = validarCampo(expresiones[input.name], input.value.trim());
            mostrarIcono(input, esValido);

            if (!esValido) {
                formValido = false;
            }
        });
    });
});

const finalizarCompraButton = document.getElementById('finalizar-compra');

finalizarCompraButton.addEventListener('click', function() {
    Swal.fire({
        title: 'Gracias por su compra',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
    }).then(() => {
        localStorage.clear();
        window.location.href = '../index.html'; 
    });
});