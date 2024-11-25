const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Usuário simulado para login
const usuario = {
    username: 'admin',
    password: '123456',
    setor: 'Administração'
};

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === usuario.username && password === usuario.password) {
        const token = `Bearer fake-token-for-${username}`;
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
});

// Rota protegida (Dashboard)
app.get('/dashboard', (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader === `Bearer fake-token-for-${usuario.username}`) {
        res.json({ message: `Bem-vindo ao setor de ${usuario.setor}!` });
    } else {
        res.status(403).json({ message: 'Acesso negado' });
    }
});
// Rota para o endpoint "/"
app.get('/', (req, res) => {
    res.send('Servidor rodando com sucesso!');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
