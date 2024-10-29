const formRegistro = document.getElementById('formRegistro');
const formComentario = document.getElementById('formComentario');
const comentariosList = document.getElementById('comentariosList');
const userIcon = document.getElementById('userIcon');
const userImage = document.getElementById('userImage');
const userName = document.getElementById('userName');

let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

// Función para mostrar/ocultar el formulario de registro
function toggleRegistro() {
    const registroSection = document.getElementById('registro');
    registroSection.style.display = registroSection.style.display === 'none' ? 'block' : 'none';
}

// Manejo de registro
formRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const profileImage = document.getElementById('profileImage').files[0];

    if (usuarios.find(user => user.username === username)) {
        alert('El nombre de usuario ya está en uso.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const userData = { username, password, image: event.target.result };
        usuarios.push(userData);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert('Registro exitoso.');

        // Actualiza el ícono del usuario
        userImage.src = event.target.result;
        userName.textContent = username;
        userIcon.style.cursor = 'default'; // Desactiva el clic en el ícono
        userIcon.onclick = null; // Elimina el evento clic
        toggleRegistro(); // Cierra el formulario
    };
    reader.readAsDataURL(profileImage);
});

// Manejo de comentarios
formComentario.addEventListener('submit', (e) => {
    e.preventDefault();
    const comentarioText = document.getElementById('comentario').value;
    const username = userName.textContent;

    if (!username) {
        alert('Debes registrarte primero.');
        return;
    }

    const comentario = { username, text: comentarioText };
    comentarios.push(comentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    mostrarComentarios();
    formComentario.reset();
});

// Mostrar comentarios
function mostrarComentarios() {
    comentariosList.innerHTML = '';
    comentarios.forEach(comentario => {
        const div = document.createElement('div');
        div.className = 'comentario';
        div.innerText = `${comentario.username}: ${comentario.text}`;
        comentariosList.appendChild(div);
    });
}

// Cargar comentarios al inicio
mostrarComentarios();
