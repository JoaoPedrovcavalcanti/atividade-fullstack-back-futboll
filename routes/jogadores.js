const express = require('express');
const Jogador = require('../models/Jogador');

const router = express.Router();

// CREATE - cadastrar jogador
router.post('/', async (req, res) => {
  try {
    const jogador = await Jogador.create(req.body);
    res.status(201).json(jogador);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// READ - listar jogadores (aceita ?busca=nome ou clube)
router.get('/', async (req, res) => {
  try {
    const { busca } = req.query;
    const filtro = {};
    if (busca && busca.trim() !== '') {
      filtro.$or = [
        { nome: { $regex: busca.trim(), $options: 'i' } },
        { clube: { $regex: busca.trim(), $options: 'i' } },
      ];
    }
    const jogadores = await Jogador.find(filtro).sort({ createdAt: -1 });
    res.json(jogadores);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar jogadores.' });
  }
});

// READ - buscar um jogador pelo id
router.get('/:id', async (req, res) => {
  try {
    const jogador = await Jogador.findById(req.params.id);
    if (!jogador) return res.status(404).json({ erro: 'Jogador não encontrado.' });
    res.json(jogador);
  } catch (erro) {
    res.status(400).json({ erro: 'ID inválido.' });
  }
});

// UPDATE - editar jogador
router.put('/:id', async (req, res) => {
  try {
    const jogador = await Jogador.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!jogador) return res.status(404).json({ erro: 'Jogador não encontrado.' });
    res.json(jogador);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// DELETE - excluir jogador
router.delete('/:id', async (req, res) => {
  try {
    const jogador = await Jogador.findByIdAndDelete(req.params.id);
    if (!jogador) return res.status(404).json({ erro: 'Jogador não encontrado.' });
    res.json({ mensagem: 'Jogador excluído com sucesso!' });
  } catch (erro) {
    res.status(400).json({ erro: 'ID inválido.' });
  }
});

module.exports = router;
