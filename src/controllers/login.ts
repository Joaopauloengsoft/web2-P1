import 'dotenv/config'; // Esta deve ser a primeira linha do arquivo
// Importar a lib Express
import express from "express";
import type { Request, Response } from "express";

//Importar o arquivo com as credenciais do Banco de Dados 
import { AppDataSource } from "../data-source.js";
import { error } from "node:console";

// Criar a Aplicação 
const router = express.Router()

//Inicializar a conexão com o Banco de Dados 
AppDataSource.initialize().then(()=>{
    console.log("Conexão do Banco de Dados realizado com sucesso!")
}).catch((error)=>{
    console.log("Erro na conexão do Banco de Dados!", error)
})

// Criar rota GET principal
router.get("/",(req:Request, res:Response)=>{
    res.send("Bem Vindo Pessoal! Tela de Login na Rota")
})

// Exportar a instrução da rota

export default router