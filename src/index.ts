// Importar a lib Express
import express from "express";

//Importar Variaves de Ambiente 
import dotenv from "dotenv";

//Carregando as variaveis do .env
dotenv.config()

// Criar a Aplicação 
const app = express()

//Criar um middleware para receber os dados no corpo da requisição
app.use(express.json());

// Incluir os Controolers
import AuthController from "./controllers/AuthController.js";
import SituationsController from "./controllers/SituationsController.js";

// Criar as rotas
app.use('/', AuthController)
app.use('/', SituationsController)

// iniciar o servidor na porta 8080
app.listen(process.env.PORT,()=>{
    console.log(`Servidor Iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)
})