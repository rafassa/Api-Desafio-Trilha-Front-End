import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import { link } from "fs";

// Corrige a definição de __dirname no ambiente ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Length']
}));

app.use(express.json());

// ✅ Servindo a pasta de imagens corretamente
app.use('/img', express.static(path.join(__dirname, 'img')));

// 📌 Rota de fretes
const frete = [
  { nome: "ExpressBox", multiplicador: 1.12 },
  { nome: "EnvioBusca", multiplicador: 1.11 },
  { nome: "Flashexpress", multiplicador: 1.13 },
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
  { id: 1, vehicle: "Ranger", volumetotal: 145760, connected: 70000, softwareUpdates: 27550, img: "https://api-desafio-trilha-front-end.onrender.com/img/ranger.png" },
  { id: 2, vehicle: "Mustang", volumetotal: 1500, connected: 500, softwareUpdates: 750, img: "https://api-desafio-trilha-front-end.onrender.com/img/mustang.png" },
  { id: 3, vehicle: "Territory", volumetotal: 4560, connected: 4000, softwareUpdates: 3050, img: "https://api-desafio-trilha-front-end.onrender.com/img/territory.png" },
  { id: 4, vehicle: "Bronco Sport", volumetotal: 7560, connected: 4060, softwareUpdates: 2050, img: "https://api-desafio-trilha-front-end.onrender.com/img/broncoSport.png" },
];

app.get("/vehicles", (req, res) => res.json({ vehicles }));

// 📌 Rota de dados dos veículos
app.post("/vehicleData", (req, res) => {
  const { vin } = req.body;

  const vehicleData = {
    "2FRHDUYS2Y63NHD22454": { id: 1, odometro: 23344, nivelCombustivel: 76, status: "on", lat: -12.2322, long: -35.2314 },
    "2RFAASDY54E4HDU34874": { id: 2, odometro: 130000, nivelCombustivel: 19, status: "off", lat: -12.2322, long: -35.2314 },
    "2FRHDUYS2Y63NHD22455": { id: 3, odometro: 50000, nivelCombustivel: 90, status: "on", lat: -12.2322, long: -35.2314 },
    "2RFAASDY54E4HDU34875": { id: 4, odometro: 10000, nivelCombustivel: 25, status: "off", lat: -12.2322, long: -35.2314 },
    "2FRHDUYS2Y63NHD22654": { id: 5, odometro: 23544, nivelCombustivel: 76, status: "on", lat: -12.2322, long: -35.2314 },
    "2FRHDUYS2Y63NHD22854": { id: 6, odometro: 23574, nivelCombustivel: 76, status: "on", lat: -12.2322, long: -35.2314 },
  };

  if (!vehicleData[vin]) {
    return res.status(400).json({ message: "Código VIN utilizado não foi encontrado!" });
  }

  return res.status(200).json(vehicleData[vin]);
});

// 📌 Rota de imagens do carousel
const carouselImg = [
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/imagem_1.jpg", descricao: "Esta é a nova Ranger Ford 2022", link:"https://ford-enter-trilha.netlify.app/lancamento"},
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/imagem_2.jpg", descricao: "Ford a nossa história", link:"https://www.ford.pt/experiencia-ford/ford-blog/o-nosso-legado"},
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/imagem_3.jpg", descricao: "Nova Ford Bronco Sport 2022", link:"https://ford-enter-trilha.netlify.app/lancamento" },
];

app.get("/carouselImg", (req, res) => res.json(carouselImg));

// 📌 Rota de lançamentos de carros
const lancamentoCarros = [
  { 
    "id": 0, 
    "img": "https://api-desafio-trilha-front-end.onrender.com/img/XLCabine.png", 
    "modelo": "XL Cabine Simples 2.2 Diesel 4X4 MT 2022", 
    "preco": "183.850",
    "cacamba": "511", 
    "altura": "1821", 
    "solo": "232", 
    "capacidade": "1076", 
    "moto": "2.2", 
    "potencia": "160", 
    "volume": "1180", 
    "roda": "Aço Estampado 16" 
  },
  { 
    "id": 1, 
    "img": "https://api-desafio-trilha-front-end.onrender.com/img/xlsdiesel.png", 
    "modelo": "XLS 2.2 Diesel 4X4 AT 2022", 
    "preco": "220.690",
    "cacamba": "511", 
    "altura": "1821", 
    "solo": "232", 
    "capacidade": "1076", 
    "moto": "2.2", 
    "potencia": "160", 
    "volume": "1180", 
    "roda": "Aço Estampado 16" 
  },
  { 
    "id": 2, 
    "img": "https://api-desafio-trilha-front-end.onrender.com/img/storm.png", 
    "modelo": "Storm 3.2 Diesel 4X4 AT 2022", 
    "preco": "222.790",
    "cacamba": "511", 
    "altura": "1821", 
    "solo": "232", 
    "capacidade": "1040", 
    "moto": "3.2", 
    "potencia": "200", 
    "volume": "1180", 
    "roda": "Liga Leve 17" 
  }
]


app.get("/lancamentoCarros", (req, res) => res.json(lancamentoCarros));

// 📌 Rota de produtos (corrigido)
const resposta = [
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/filtro.png", nome: "Filtro de óleo", preco: 50, quantidade: 1 },
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/pastilha.png", nome: "Pastilhas de freio", preco: 190, quantidade: 1 },
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/bateria.png", nome: "Bateria", preco: 550, quantidade: 1 },
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/correia.png", nome: "Correia dentada", preco: 120, quantidade: 1 },
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/amortecedor.png", nome: "Amortecedores", preco: 437, quantidade: 1 },
  { img: "https://api-desafio-trilha-front-end.onrender.com/img/ignicao.png", nome: "Velas de ignição", preco: 600, quantidade: 1 },
];

app.get("/produtos", (req, res) => res.json(resposta));

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
