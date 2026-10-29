import 'dotenv/config';
import express from "express";
import type { Request, Response } from "express";

import { AppDataSource } from "../data-source.js";
import { ProductCategory } from "../entity/ProductCategories.js";
import { PaginationService } from '../services/PaginationService.js';

const router = express.Router();

// Listagem (com paginação)
router.get("/product-categories", async (req: Request, res: Response) => {
    try {
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        const page = Number(req.query.page) || 1;
        const limit = 10;

        const result = await PaginationService.paginate(productCategoryRepository, page, limit, { id: "DESC" });

        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar categorias de produtos!" });
        return;
    }
});

// Visualização de item
router.get("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        const productCategory = await productCategoryRepository.findOneBy({ id: Number(req.params.id) });
        if (!productCategory) {
            res.status(404).json({ mensagem: "Categoria de produto não encontrada!" });
            return;
        }
        res.status(200).json(productCategory);
        return;
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao visualizar categoria de produto!" });
        return;
    }
});

// Cadastro
router.post("/product-categories", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        const newProductCategory = productCategoryRepository.create(data);
        await productCategoryRepository.save(newProductCategory);

        res.status(201).json({
            mensagem: "Categoria de produto cadastrada com sucesso!",
            productCategory: newProductCategory,
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao cadastrar categoria de produto!" });
    }
});

// Edição
router.put("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        const productCategory = await productCategoryRepository.findOneBy({ id: Number(req.params.id) });
        if (!productCategory) {
            res.status(404).json({ mensagem: "Categoria de produto não encontrada!" });
            return;
        }
        productCategoryRepository.merge(productCategory, data);
        const updatedProductCategory = await productCategoryRepository.save(productCategory);

        res.status(200).json({
            mensagem: "Categoria de produto atualizada com sucesso!",
            productCategory: updatedProductCategory,
        });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar categoria de produto!" });
        return;
    }
});

// Exclusão
router.delete("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        const productCategory = await productCategoryRepository.findOneBy({ id: Number(req.params.id) });
        if (!productCategory) {
            res.status(404).json({ mensagem: "Categoria de produto não encontrada!" });
            return;
        }
        await productCategoryRepository.remove(productCategory);
        res.status(200).json({ mensagem: "Categoria de produto removida com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao remover categoria de produto!" });
        return;
    }
});

export default router;