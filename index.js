import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Length']
}));

app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));

// 📌 Rota de fretes
const frete = [
  { nome: "frete1", multiplicador: 1.12 },
  { nome: "frete2", multiplicador: 1.11 },
  { nome: "frete3", multiplicador: 1.13 },
];

app.get("/frete", (req, res) => res.json(frete));

// 📌 Rota de login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ message: "O campo de usuário ou senha não foi preenchido!" });
  }
  
  if (usuario !== "admin" || senha !== "123456") {
    return res.status(401).json({ message: "Usuário ou senha incorretos!" });
  }

  return res.status(200).json({ id: 1, usuario: "admin", email: "admin@email.com" });
});

// 📌 Rota de veículos
const vehicles = [
  { id: 1, vehicle: "Ranger", volumetotal: 145760, connected: 70000, softwareUpdates: 27550, img: "/img/ranger.png" },
  { id: 2, vehicle: "Mustang", volumetotal: 1500, connected: 500, softwareUpdates: 750, img: "/img/mustang.png" },
  { id: 3, vehicle: "Territory", volumetotal: 4560, connected: 4000, softwareUpdates: 3050, img: "/img/territory.png" },
  { id: 4, vehicle: "Bronco Sport", volumetotal: 7560, connected: 4060, softwareUpdates: 2050, img: "/img/broncoSport.png" },
];

app.get("/vehicles", (req, res) => res.json({ vehicles }));

// 📌 Rota de produtos (corrigido)
const resposta = [
  { img: "/img/filtro.png", nome: "Filtro de óleo", preco: 50, quantidade: 1 },
  { img: "/img/pastilha.png", nome: "Pastilhas de freio", preco: 190, quantidade: 1 },
  { img: "/img/bateria.png", nome: "Bateria", preco: 550, quantidade: 1 },
  { img: "/img/correia.png", nome: "Correia dentada", preco: 120, quantidade: 1 },
  { img: "/img/amortecedor.png", nome: "Amortecedores", preco: 437, quantidade: 1 },
  { img: "/img/ignicao.png", nome: "Velas de ignição", preco: 600, quantidade: 1 },
];

app.get("/produtos", (req, res) => res.json(resposta));

// 📌 Rota de lançamentos de carros (corrigido)
const lancamentoCarros = [
  { id: 0, img: "/img/XLCabine.png", modelo: "XL", preco: "132.000" },
  { id: 1, img: "/img/xlsdiesel.png", modelo: "xls", preco: "150.000" },
  { id: 2, img: "/img/storm.png", modelo: "Storm", preco: "172.000" },
];

app.get("/lancamentoCarros", (req, res) => res.json(lancamentoCarros));

// Inicializa o servidor
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
