import {DataSource} from "typeorm";
import { User } from "../entity/Users.js";
import { Situation } from "../entity/Situations.js";

export default class CreateUsersSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'users'...");

        const userRepository = dataSource.getRepository(User);
        const situationRepository = dataSource.getRepository(Situation);

        if (await userRepository.count() > 0) {
            console.log("A tabela 'users' já possui dados. O seed não será executado.");
            return;
        }

        const activeSituation = await situationRepository.findOneBy({ nameSituation: "Ativo" });
        const inactiveSituation = await situationRepository.findOneBy({ nameSituation: "Inativo" });

        if (!activeSituation || !inactiveSituation) {
            console.log("Situações não encontradas. Execute primeiro o seed de 'situations'.");
            return;
        }

        await userRepository.save([
            { name: "Usuário Um", email: "usuario1@example.com", situationId: activeSituation.id },
            { name: "Usuário Dois", email: "usuario2@example.com", situationId: activeSituation.id },
            { name: "Usuário Três", email: "usuario3@example.com", situationId: inactiveSituation.id },
        ]);
        console.log("Seed para a tabela 'users' concluído com sucesso!");
    }
}