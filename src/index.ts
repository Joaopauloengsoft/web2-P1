// Importar a lib Express
import express from "express";

// Criar a Aplicação 
const app = express()

// Incluir os Controolers
import login from "./controllers/login.js";

// Criar as rotas
app.use('/', login)

// iniciar o servidor na porta 8080
app.listen(8080,()=>{
    console.log("Servidor Iniciado na porta 8080: http://localhost:8080")
})