import {DataSource} from "typeorm";
import { Product } from "../entity/Products.js";
import { ProductSituation } from "../entity/ProductSituations.js";
import { ProductCategory } from "../entity/ProductCategories.js";

export default class CreateProductsSeeds {
    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'products'...");

        const productRepository = dataSource.getRepository(Product);
        const productSituationRepository = dataSource.getRepository(ProductSituation);
        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        if (await productRepository.count() > 0) {
            console.log("A tabela 'products' já possui dados. O seed não será executado.");
            return;
        }

        const available = await productSituationRepository.findOneBy({ name: "Em estoque" });
        const outOfStock = await productSituationRepository.findOneBy({ name: "Fora de estoque" });
        const electronics = await productCategoryRepository.findOneBy({ name: "Eletrônicos" });
        const books = await productCategoryRepository.findOneBy({ name: "Livros" });

        if (!available || !outOfStock || !electronics || !books) {
            console.log("Situações/categorias de produtos não encontradas. Execute primeiro os seeds anteriores.");
            return;
        }

        await productRepository.save([
            { name: "Notebook", productSituationId: available.id, productCategoryId: electronics.id },
            { name: "Fone de Ouvido", productSituationId: outOfStock.id, productCategoryId: electronics.id },
            { name: "Livro de TypeScript", productSituationId: available.id, productCategoryId: books.id },
        ]);
        console.log("Seed para a tabela 'products' concluído com sucesso!");
    }
}