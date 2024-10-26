const express = require('express');
const axios = require('axios');
const session = require('express-session');
const app = express();

// Configuración de sesión
app.use(session({
    secret: 'secret', // Cambia esto por una clave secreta segura
    resave: false,
    saveUninitialized: true,
}));

// Credenciales de Discord
const CLIENT_ID = 'TU_CLIENT_ID'; // Reemplaza con tu Client ID
const CLIENT_SECRET = 'TU_CLIENT_SECRET'; // Reemplaza con tu Client Secret
const REDIRECT_URI = 'https://tu-sitio.com/auth/discord/callback'; // Cambia a tu URL de redirección

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
        res.redirect('/');
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
