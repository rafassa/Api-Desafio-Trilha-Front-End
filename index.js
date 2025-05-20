import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Length']
}));

app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));


// 📌 Rota de produtos
const resposta = [
  { nome: "Filtro de óleo", preco: 50, quantidade: 1, img: "/img/filtro.png" },
  { nome: "Pastilhas de freio", preco: 190, quantidade: 1, img: "/img/pastilha.png" },
  { nome: "Bateria", preco: 550, quantidade: 1, img: "/img/bateria.png" },
  { nome: "Correia dentada", preco: 120, quantidade: 1, img: "/img/correia.png" },
  { nome: "Amortecedores", preco: 437, quantidade: 1, img: "/img/amortecedor.png" },
  { nome: "Velas de ignição", preco: 600, quantidade: 1, img: "/img/ignicao.png" },
];

app.get("/", (req, res) => res.json(resposta));

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

const carouselImg =[
  {img: "/img/XLCabine.png", descricao:"Esta é a nova Ranger Ford 2022.Verifique as novidades"},
  {img: "/img/xlsdiesel.png", descricao:"Ford a nossa historia"},
  {img: "/img/storm.png", descricao:"Nova Ford Bronco Sport 2022"},
]
app.get("/carouselImg", (req, res) => res.json(carouselImg));



const lancamentoCarros =[
  {id:0, img: "/img/XLCabine.png", modelo:"XL", preco:"132.000", alturaCacamba:"511",alturaVeiculo:"1821", AlturaLivre:"232", capacidadeCarga:"1234",motor:"2.2",potencia:"160",volumeCacamba:"1420",roda:"Aço Estampado 16"},
  {id:1, img: "/img/xlsdiesel.png",modelo:"xls", preco:"150.000", alturaCacamba:"511",alturaVeiculo:"1821", AlturaLivre:"232", capacidadeCarga:"1076",motor:"2.2",potencia:"160",volumeCacamba:"1180",roda:"Aço Estampado 16"},
  {id:2, img: "/img/storm.png", modelo:"Storm", preco:"172.000", alturaCacamba:"511",alturaVeiculo:"1821", AlturaLivre:"232", capacidadeCarga:"1040",motor:"3.2",potencia:"200",volumeCacamba:"1180",roda:"Liga Leve 17"},
]


app.get("/lancamentoCarros", (req, res) => res.json(lancamentoCarros));

// Inicializa o servidor
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
