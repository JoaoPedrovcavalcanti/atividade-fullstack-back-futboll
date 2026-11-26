require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Jogador = require('./models/Jogador');
const jogadoresRoutes = require('./routes/jogadores');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'online', projeto: 'API Futebol - Jogadores' });
});

app.use('/jogadores', jogadoresRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/futebol_fullstack';

// Alguns jogadores iniciais, só para o banco não começar vazio
const INICIAIS = [
  { nome: 'Neymar Jr', clube: 'Santos', posicao: 'Atacante', numero: 10, gols: 79 },
  { nome: 'Casemiro', clube: 'Manchester United', posicao: 'Meio-campo', numero: 18, gols: 7 },
  { nome: 'Marquinhos', clube: 'PSG', posicao: 'Zagueiro', numero: 5, gols: 4 },
  { nome: 'Alisson Becker', clube: 'Liverpool', posicao: 'Goleiro', numero: 1, gols: 0 },
  { nome: 'Vinícius Júnior', clube: 'Real Madrid', posicao: 'Atacante', numero: 7, gols: 20 },
];

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB com sucesso!');

    if ((await Jogador.countDocuments()) === 0) {
      await Jogador.insertMany(INICIAIS);
      console.log('Banco vazio: jogadores iniciais cadastrados.');
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor ativo em http://localhost:${PORT}`);
      console.log(`Lista de jogadores em http://localhost:${PORT}/jogadores`);
    });
  })
  .catch((erro) => {
    console.error('Erro de conexão com MongoDB:', erro.message);
  });
