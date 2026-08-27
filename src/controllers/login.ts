// Importar a lib Express
import express from "express";
import type { Request, Response } from "express";

// Criar a Aplicação 
const router = express.Router()

// Criar rota GET principal
router.get("/",(req:Request, res:Response)=>{
    res.send("Bem Vindo Pessoal! Tela de Login na Rota")
})

// Exportar a instrução da rota

export default router