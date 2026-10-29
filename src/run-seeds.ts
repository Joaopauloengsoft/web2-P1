import { AppDataSource } from "./data-source.js";
import CreateProductCategoriesSeeds from "./seeds/CreateProductCategoriesSeeds.js";
import CreateProductSituationsSeeds from "./seeds/CreateProductSituationsSeeds.js";
import CreateProductsSeeds from "./seeds/CreateProductsSeeds.js";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds.js";
import CreateUsersSeeds from "./seeds/CreateUsersSeeds.js";


const runSeeds = async () => {
    console.log("Iniciando a execução dos seeds...");

    await AppDataSource.initialize();
    console.log("Banco de dados conectado com sucesso!");

    try {
        //Cria a instancia da classe CreateSituationsSeeds
        const createSituationsSeeds = new CreateSituationsSeeds();
        await createSituationsSeeds.run(AppDataSource);

        const createUsersSeeds = new CreateUsersSeeds();
        await createUsersSeeds.run(AppDataSource);

        const createProductSituationsSeeds = new CreateProductSituationsSeeds();
        await createProductSituationsSeeds.run(AppDataSource);

        const createProductCategoriesSeeds = new CreateProductCategoriesSeeds();
        await createProductCategoriesSeeds.run(AppDataSource);

        const createProductsSeeds = new CreateProductsSeeds();
        await createProductsSeeds.run(AppDataSource);

    }catch (error) {
        console.error("Erro ao executar os seeds:", error);

    }finally{
        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");

    }
}

runSeeds();