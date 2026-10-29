import 'dotenv/config'; // Esta deve ser a primeira linha do arquivo
// Importar a lib Express
import express from "express";
import type { Request, Response } from "express";

// Importar o arquivo com as credenciais do Banco de Dados
import { AppDataSource } from "../data-source.js";
import { Product } from "../entity/Products.js";
import { PaginationService } from '../services/PaginationService.js';

// Criar a Aplicação
const router = express.Router();

// Criar rota de listagem (com paginação)
router.get("/products", async (req: Request, res: Response) => {
    try {
        //Obter o repositório da entidade Product
        const productRepository = AppDataSource.getRepository(Product);

        //Receber o número da página e definir página 1 com padrão
        const page = Number(req.query.page) || 1;

        //Definir o limite de registros por página
        const limit = 10;

        // O último parâmetro carrega a situação e a categoria de cada produto
        const result = await PaginationService.paginate(
            productRepository,
            page,
            limit,
            { id: "DESC" },
            { productSituation: true, productCategory: true }
        );

        //Retornar a resposta com os dados e informações de paginação
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar produtos!",
        });
        return;
    }
});

// Criar rota visualização de item
router.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: { productSituation: true, productCategory: true },
        });
        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado!",
            });
            return;
        }
        res.status(200).json(product);
        return;
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao visualizar produto!",
        });
        return;
    }
});

// Criar rota de cadastro
router.post("/products", async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const productRepository = AppDataSource.getRepository(Product);

        const newProduct = productRepository.create(data);

        await productRepository.save(newProduct);

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso!",
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar produto!",
        });
    }
});

// Criar rota de edição de item
router.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id: Number(req.params.id) });
        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado!",
            });
            return;
        }
        //Atualizar os dados do item
        productRepository.merge(product, data);

        //Salvar os dados atualizados no banco de dados
        const updatedProduct = await productRepository.save(product);

        res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar produto!",
        });
        return;
    }
});

// Criar rota para deletar item
router.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id: Number(req.params.id) });
        if (!product) {
            res.status(404).json({
                mensagem: "Produto não encontrado!",
            });
            return;
        }
        await productRepository.remove(product);
        res.status(200).json({
            mensagem: "Produto removido com sucesso!",
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao remover produto!",
        });
        return;
    }
});

// Exportar a instrução da rota
export default router;