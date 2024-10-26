require('dotenv').config(); // Asegúrate de tener dotenv instalado y cargado

const express = require('express');
const axios = require('axios');
const session = require('express-session');
const app = express();

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret', // Cambia esto por una clave secreta segura
    resave: false,
    saveUninitialized: true,
}));

// Credenciales de Discord
const CLIENT_ID = process.env.1299613996600524830; // Usar variable de entorno
const CLIENT_SECRET = process.env.6Z3gjafvS7eGJ1JE0_-7hjZW9AQrbb1C; // Usar variable de entorno
const REDIRECT_URI = 'https://developer-7452.github.io/Devepage/oauth2/discord/callback'; // Cambia a tu URL de redirección

app.get('/login', (req, res) => {
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=1299613996600524830&response_type=code&redirect_uri=https%3A%2F%2Fdeveloper-7452.github.io%2FDevepage%2F&scope=identify`;
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
        res.redirect('/error'); // Podrías tener una página de error para manejar fallos
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
