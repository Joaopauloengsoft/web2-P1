import {DataSource} from "typeorm";
import { ProductCategory } from "../entity/ProductCategories.js";

export default class CreateProductCategoriesSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'product_categories'...");

        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        if (await productCategoryRepository.count() > 0) {
            console.log("A tabela 'product_categories' já possui dados. O seed não será executado.");
            return;
        }

        await productCategoryRepository.save([
            { name: "Eletrônicos" },
            { name: "Roupas" },
            { name: "Alimentos" },
            { name: "Livros" },
        ]);
        console.log("Seed para a tabela 'product_categories' concluído com sucesso!");
    }
}