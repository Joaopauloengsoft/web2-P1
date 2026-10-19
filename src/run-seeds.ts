import { AppDataSource } from "./data-source.js";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds.js";


const runSeeds = async () => {
    console.log("Iniciando a execução dos seeds...");

    await AppDataSource.initialize();
    console.log("Banco de dados conectado com sucesso!");

    try {
        //Cria a instancia da classe CreateSituationsSeeds
        const createSituationsSeeds = new CreateSituationsSeeds();
        await createSituationsSeeds.run(AppDataSource);


    }catch (error) {
        console.error("Erro ao executar os seeds:", error);

    }finally{
        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");

    }
}

runSeeds();