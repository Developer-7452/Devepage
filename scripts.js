// Obtener elementos del DOM
const toggleRegistro = document.querySelector('.usuario');
const formularioRegistro = document.querySelector('.formulario-registro');
const botonRegistrar = document.querySelector('.registrar');
const inputNombre = document.querySelector('#nombre');
const inputFoto = document.querySelector('#foto');
const comentariosContenedor = document.querySelector('.comentarios');
const botonModo = document.querySelector('.boton-modo');

// Inicializar variables
let perfil = {
    nombre: '',
    foto: '',
};

// Mostrar/ocultar formulario de registro
toggleRegistro.addEventListener('click', () => {
    formularioRegistro.classList.toggle('activo');
});

// Registrar nuevo usuario
botonRegistrar.addEventListener('click', (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    const nombre = inputNombre.value.trim();
    const foto = inputFoto.files[0];

    if (nombre && foto) {
        const reader = new FileReader();
        reader.onload = function (e) {
            perfil = {
                nombre: nombre,
                foto: e.target.result, // Usar el resultado de FileReader
            };
            // Actualizar el ícono de usuario
            actualizarPerfil();
            formularioRegistro.classList.remove('activo'); // Ocultar formulario
            inputNombre.value = ''; // Limpiar el campo de nombre
            inputFoto.value = ''; // Limpiar el campo de archivo
        };
        reader.readAsDataURL(foto); // Leer la imagen como URL
    }
});

// Actualizar perfil de usuario
function actualizarPerfil() {
    const iconoUsuario = document.querySelector('.usuario img');
    const nombreUsuario = document.querySelector('.usuario span');

    iconoUsuario.src = perfil.foto; // Cambiar la imagen del perfil
    iconoUsuario.style.borderRadius = '50%'; // Asegurarse de que sea circular
    iconoUsuario.style.width = '40px'; // Tamaño pequeño
    iconoUsuario.style.height = '40px'; // Tamaño pequeño
    nombreUsuario.textContent = perfil.nombre; // Mostrar el nombre
}

// Agregar un nuevo comentario
const nuevoComentario = (nombre, foto, texto) => {
    const comentarioDiv = document.createElement('div');
    comentarioDiv.classList.add('comentario');

    const img = document.createElement('img');
    img.src = foto;
    img.alt = 'Perfil de ' + nombre;

    const nombreSpan = document.createElement('span');
    nombreSpan.textContent = nombre;

    const textoP = document.createElement('p');
    textoP.textContent = texto;

    comentarioDiv.appendChild(img);
    comentarioDiv.appendChild(nombreSpan);
    comentarioDiv.appendChild(textoP);
    comentariosContenedor.appendChild(comentarioDiv);
};

// Enviar un nuevo comentario
document.querySelector('.enviar-comentario').addEventListener('click', (event) => {
    event.preventDefault();
    const comentarioTexto = document.querySelector('#comentario').value.trim();
    if (comentarioTexto) {
        nuevoComentario(perfil.nombre, perfil.foto, comentarioTexto);
        document.querySelector('#comentario').value = ''; // Limpiar el campo de comentario
    }
});

// Modo oscuro
botonModo.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const elementos = document.querySelectorAll('.navbar, .portada, .comentarios');
    elementos.forEach(elemento => {
        elemento.classList.toggle('dark-mode');
    });
    botonModo.classList.toggle('dark-mode');
});
