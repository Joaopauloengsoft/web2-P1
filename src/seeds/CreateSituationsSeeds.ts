import {DataSource} from "typeorm";
import { Situation } from "../entity/Situations.js";

export default class CreateSituationsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'situations'...");

        const situationRepository = dataSource.getRepository(Situation);

        const existingSituations = await situationRepository.count();

        if (existingSituations > 0) {
            console.log("A tabela 'situations' já possui dados. O seed não será executado.");
            return;
        }

        const situationsData = [
            { nameSituation: "Ativo" },
            { nameSituation: "Inativo" },
            { nameSituation: "Pendente" },
        ];

        await situationRepository.save(situationsData);
        console.log("Seed para a tabela 'situations' concluído com sucesso!");


    }
}