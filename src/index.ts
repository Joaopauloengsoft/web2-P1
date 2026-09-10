// Importar a lib Express
import express from "express";

//Importar Variaves de Ambiente 
import dotenv from "dotenv";

//Carregando as variaveis do .env
dotenv.config()

// Criar a Aplicação 
const app = express()

// Incluir os Controolers
import login from "./controllers/login.js";

// Criar as rotas
app.use('/', login)

// iniciar o servidor na porta 8080
app.listen(process.env.PORT,()=>{
    console.log(`Servidor Iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)
})