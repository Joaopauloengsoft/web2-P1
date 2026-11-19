import 'dotenv/config'; // Esta deve ser a primeira linha do arquivo
// Importar a lib Express
import express from "express";
import type { Request, Response } from "express";

//Importar o arquivo com as credenciais do Banco de Dados 
import { AppDataSource } from "../data-source.js";
import { error } from "node:console";

// Criar a Aplicação 
const router = express.Router()


// Criar rota GET principal
router.get("/test-connection",(req:Request, res:Response)=>{
    res.status(200).json({ message: "Conexão com API realizada com sucesso!" })
})

// Exportar a instrução da rota

export default router