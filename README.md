# Futebol - API Backend

API REST feita com **Node.js**, **Express** e **MongoDB (Mongoose)**. Guarda os jogadores de futebol cadastrados no app mobile (repositório do frontend).

## Entidade: Jogador

| Campo | Tipo | Observação |
| :--- | :--- | :--- |
| `nome` | String | obrigatório |
| `clube` | String | obrigatório |
| `posicao` | String | Goleiro, Zagueiro, Lateral, Meio-campo ou Atacante |
| `numero` | Number | camisa, de 1 a 99 |
| `gols` | Number | mínimo 0 |

## Como rodar

**Pré-requisitos:** Node.js 18+ e um MongoDB (instalado no PC ou uma conta gratuita no MongoDB Atlas).

1. Clone o repositório e entre na pasta:
   ```bash
   git clone https://github.com/JoaoPedrovcavalcanti/Futebol-Backend.git
   cd Futebol-Backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o arquivo `.env` copiando o `.env.example`:
   ```bash
   copy .env.example .env
   ```
   Se usar o MongoDB Atlas, troque o valor de `MONGO_URI` pela sua string de conexão.
4. Inicie o servidor:
   ```bash
   npm start
   ```
   Deve aparecer "Conectado ao MongoDB com sucesso!". Se o banco estiver vazio, 5 jogadores iniciais são cadastrados.
5. Teste no navegador: `http://localhost:3000/jogadores`

## Rotas (CRUD)

| Método | Rota | Ação |
| :--- | :--- | :--- |
| POST | `/jogadores` | Cadastrar jogador |
| GET | `/jogadores` | Listar (aceita `?busca=`) |
| GET | `/jogadores/:id` | Buscar um jogador |
| PUT | `/jogadores/:id` | Editar jogador |
| DELETE | `/jogadores/:id` | Excluir jogador |

## Estrutura

```text
├── models/Jogador.js      # schema do Mongoose
├── routes/jogadores.js    # rotas do CRUD
├── server.js              # Express + conexão com o MongoDB
├── .env.example
└── package.json
```
