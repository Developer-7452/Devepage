require('dotenv').config(); // Cargar las variables de entorno

const express = require('express');
const axios = require('axios');
const session = require('express-session');
const app = express();

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Usa la variable de entorno o un valor por defecto
    resave: false,
    saveUninitialized: true,
}));

// Credenciales de Discord
const CLIENT_ID = '1299613996600524830'; // Tu Client ID
const CLIENT_SECRET = TU-0-796j99hTDjGYamVxp6MMjDMeZPu; // Obtener el Client Secret desde las variables de entorno
const REDIRECT_URI = 'https://developer-7452.github.io/Devepage/'; // URL de redirección

app.get('/login', (req, res) => {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;
    res.redirect(discordAuthUrl);
});

app.get('/auth/discord/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
            scope: 'identify'
        }).toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` }
        });

        req.session.user = userResponse.data;
        res.redirect('/');
    } catch (error) {
        console.error('Error en la autenticación de Discord:', error);
        res.redirect('/error'); // Manejar el error adecuadamente
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Endpoint para obtener la sesión
app.get('/session', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.json(null);
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
function toggleMenu() {
    var menu = document.getElementById("dropdown-menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
