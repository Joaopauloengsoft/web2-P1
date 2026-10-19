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
router.get("/situations", async(req: Request, res: Response) => {

    try {
        const situationRepository = AppDataSource.getRepository(Situation);
        const situations = await situationRepository.find();
        res.status(200).json(situations);
        return;
}   catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar situações!",
        });
        return;
}
});

// Criar rota visualização de item
router.get("/situations/:id", async(req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const situationRepository = AppDataSource.getRepository(Situation);
        const situation = await situationRepository.findOneBy({ id: Number(req.params.id) });
        if (!situation) {
            res.status(404).json({
                mensagem: "Situação não encontrada!",
            });
            return;
        }
        res.status(200).json(situation);
        return;
}   catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar situações!",
        });
        return;
}
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