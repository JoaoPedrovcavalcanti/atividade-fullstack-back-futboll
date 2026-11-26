const mongoose = require('mongoose');

const jogadorSchema = new mongoose.Schema(
  {
    nome: { type: String, required: [true, 'O nome é obrigatório.'], trim: true },
    clube: { type: String, required: [true, 'O clube é obrigatório.'], trim: true },
    posicao: {
      type: String,
      enum: {
        values: ['Goleiro', 'Zagueiro', 'Lateral', 'Meio-campo', 'Atacante'],
        message: '{VALUE} não é uma posição válida.',
      },
      default: 'Atacante',
    },
    numero: { type: Number, min: [1, 'Número mínimo é 1.'], max: [99, 'Número máximo é 99.'], default: 10 },
    gols: { type: Number, min: [0, 'Gols não pode ser negativo.'], default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Jogador', jogadorSchema);
