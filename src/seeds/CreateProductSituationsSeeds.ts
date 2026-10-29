import {DataSource} from "typeorm";
import { ProductCategory } from "../entity/ProductCategories.js";
import { ProductSituation } from "../entity/ProductSituations.js";


export default class CreateProductSituationsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'product_situations'...");

        const productSituationRepository = dataSource.getRepository(ProductSituation);

        if (await productSituationRepository.count() > 0) {
            console.log("A tabela 'product_situations' já possui dados. O seed não será executado.");
            return;
        }

        await productSituationRepository.save([
            { name: "Disponível" },
            { name: "Indisponível" },
            { name: "Em estoque" },
            { name: "Fora de estoque" },
        ]);
        console.log("Seed para a tabela 'product_situations' concluído com sucesso!");
    }
}