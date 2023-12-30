const formulario = document.getElementById('form-horizontal');
const inputs = document.querySelectorAll('#form-horizontal input');
const textarea = document.querySelectorAll('#form-horizontal textarea')
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ]{4,16}$/, 
	apellido: /^[a-zA-ZÀ-ÿ]{4,16}$/,
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{8,10}$/,
    message: /^[a-zA-ZÀ-ÿ0-9\.\$:]{1,250}$/,
}
const campos = {
    nombre: false,
    apellido:false,
    email:false,
    telefono:false,
    message:false,
}
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
        break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
        case "message":
            validarCampo(expresiones.message, e.target, 'message');
        break;
    }
}
const validarCampo = (expresiones, input, campo) => {
    const valor = input.value;
    if ((input.tagName === 'INPUT' && expresiones.test(valor)) || 
        (input.tagName === 'TEXTAREA' && expresiones.test(valor))) {
        document.getElementById(`form-group-${campo}`).classList.remove('form-control-incorrecto');
        document.getElementById(`form-group-${campo}`).classList.add('form-control-correcto');
        document.querySelector(`#formulario-${campo} i`).classList.remove('fa', 'solid', 'fa-circle-xmark');
        document.querySelector(`#formulario-${campo} i`).classList.add('fa', 'solid', 'fa-check');
        document.querySelector(`#formulario-${campo} .formulario-error`).classList.remove('formulario-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`form-group-${campo}`).classList.add('form-control-incorrecto');
        document.getElementById(`form-group-${campo}`).classList.remove('form-control-correcto');
        document.querySelector(`#formulario-${campo} i`).classList.add('fa', 'solid', 'fa-circle-xmark');
        document.querySelector(`#formulario-${campo} i`).classList.remove('fa', 'solid', 'fa-check');
        document.querySelector(`#formulario-${campo} .formulario-error`).classList.add('formulario-error-activo');
        campos[campo] = false;
    }
}
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
});
textarea.forEach((textarea) => {
    textarea.addEventListener('keyup', validarFormulario)
    textarea.addEventListener('blur', validarFormulario)
});
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if(campos.nombre && campos.apellido && campos.email && campos.telefono && campos.message){
        formulario.reset();
        document.getElementById('formulario-mensaje-exito').classList.add('formulario-mensaje-exito-activo')
        setTimeout(() => {
            document.getElementById('formulario-mensaje-exito').classList.remove('formulario-mensaje-exito-activo')
        }, 5000);
        document.querySelectorAll('.form-control-correcto').forEach ((icono) => {
            icono.classList.remove('form-control-correcto')
        });
    } else {
        document.getElementById('formulario-mensaje-error').classList.add('formulario-mensaje-error-activo')
        setTimeout(() => {
            document.getElementById('formulario-mensaje-error').classList.remove('formulario-mensaje-error-activo')
        }, 5000);
        clearTimeout();
    }
});