import 'dotenv/config'; // Esta deve ser a primeira linha do arquivo
import express from "express";
import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { ProductSituation } from "../entity/ProductSituations.js";
import { PaginationService } from '../services/PaginationService.js';

const router = express.Router();

// Listagem (com paginação)
router.get("/product-situations", async (req: Request, res: Response) => {
    try {
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const result = await PaginationService.paginate(productSituationRepository, page, limit, { id: "DESC" });

        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar situações de produtos!" });
        return;
    }
});

// Visualização de item
router.get("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const productSituation = await productSituationRepository.findOneBy({ id: Number(req.params.id) });

        if (!productSituation) {
            res.status(404).json({ mensagem: "Situação de produto não encontrada!" });
            return;
        }

        res.status(200).json(productSituation);
        return;
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao visualizar situação de produto!" });
        return;
    }
});

// Cadastro
router.post("/product-situations", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const newProductSituation = productSituationRepository.create(data);
        await productSituationRepository.save(newProductSituation);

        res.status(201).json({
            mensagem: "Situação de produto cadastrada com sucesso!",
            productSituation: newProductSituation,
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao cadastrar situação de produto!" });
    }
});

// Edição
router.put("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const productSituation = await productSituationRepository.findOneBy({ id: Number(req.params.id) });

        if (!productSituation) {
            res.status(404).json({ mensagem: "Situação de produto não encontrada!" });
            return;
        }

        productSituationRepository.merge(productSituation, data);
        const updatedProductSituation = await productSituationRepository.save(productSituation);

        res.status(200).json({
            mensagem: "Situação de produto atualizada com sucesso!",
            productSituation: updatedProductSituation,
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar situação de produto!" });
        return;
    }
});

// Exclusão
router.delete("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const productSituation = await productSituationRepository.findOneBy({ id: Number(req.params.id) });

        if (!productSituation) {
            res.status(404).json({ mensagem: "Situação de produto não encontrada!" });
            return;
        }

        await productSituationRepository.remove(productSituation);
        res.status(200).json({ mensagem: "Situação de produto removida com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao remover situação de produto!" });
        return;
    }
});

export default router;