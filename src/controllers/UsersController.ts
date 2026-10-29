import 'dotenv/config'; // Esta deve ser a primeira linha do arquivo
// Importar a lib Express
import express from "express";
import type { Request, Response } from "express";

// Importar o arquivo com as credenciais do Banco de Dados
import { AppDataSource } from "../data-source.js";
import { User } from "../entity/Users.js";
import { PaginationService } from '../services/PaginationService.js';

// Criar a Aplicação
const router = express.Router();

// Criar rota de listagem (com paginação)
router.get("/users", async (req: Request, res: Response) => {
    try {
        //Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        //Receber o número da página e definir página 1 com padrão
        const page = Number(req.query.page) || 1;

        //Definir o limite de registros por página
        const limit = 10;

        // O último parâmetro carrega a situação de cada usuário junto com os dados
        const result = await PaginationService.paginate(userRepository, page, limit, { id: "DESC" }, { situation: true });

        //Retornar a resposta com os dados e informações de paginação
        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao listar usuários!",
        });
        return;
    }
});

// Criar rota visualização de item
router.get("/users/:id", async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: { situation: true },
        });
        if (!user) {
            res.status(404).json({
                mensagem: "Usuário não encontrado!",
            });
            return;
        }
        res.status(200).json(user);
        return;
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao visualizar usuário!",
        });
        return;
    }
});

// Criar rota de cadastro
router.post("/users", async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const newUser = userRepository.create(data);

        await userRepository.save(newUser);

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário!",
        });
    }
});

// Criar rota de edição de item
router.put("/users/:id", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        if (!user) {
            res.status(404).json({
                mensagem: "Usuário não encontrado!",
            });
            return;
        }
        //Atualizar os dados do item
        userRepository.merge(user, data);

        //Salvar os dados atualizados no banco de dados
        const updatedUser = await userRepository.save(user);

        res.status(200).json({
            mensagem: "Usuário atualizado com sucesso!",
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar usuário!",
        });
        return;
    }
});

// Criar rota para deletar item
router.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: Number(req.params.id) });
        if (!user) {
            res.status(404).json({
                mensagem: "Usuário não encontrado!",
            });
            return;
        }
        await userRepository.remove(user);
        res.status(200).json({
            mensagem: "Usuário removido com sucesso!",
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao remover usuário!",
        });
        return;
    }
});

// Exportar a instrução da rota
export default router;