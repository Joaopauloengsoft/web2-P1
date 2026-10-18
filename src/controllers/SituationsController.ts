import 'dotenv/config'; // Esta deve ser a primeira linha do arquivo
// Importar a lib Express
import express from "express";
import type { Request, Response } from "express";

// Importar o arquivo com as credenciais do Banco de Dados
import { AppDataSource } from "../data-source.js";
import { Situation } from "../entity/Situations.js";

// Criar a Aplicação
const router = express.Router();

// Criar rota GET principal
router.get("/situations", (req: Request, res: Response) => {
    res.send("Bem Vindo Pessoal! Tela de Situações na Rota");
});

// Criar rota POST principal
router.post("/situations", async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const situationRepository = AppDataSource.getRepository(Situation);

        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            mensagem: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar situação!",
        });
    }
});

// Exportar a instrução da rota
export default router;