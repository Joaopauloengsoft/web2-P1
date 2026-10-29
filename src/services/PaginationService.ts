import type { FindOptionsOrder, FindOptionsRelations, ObjectLiteral, Repository } from "typeorm";

interface PaginationResult<T> {
    error: boolean;
    data: T[];
    currentPage: number;
    lastPage: number;
    totalRecords: number;
}

export class PaginationService {
    public static async paginate<T extends ObjectLiteral>(
        repository: Repository<T>,
        page: number = 1,
        limit: number = 10,
        order: FindOptionsOrder<T> = {},
        relations?: FindOptionsRelations<T>
    ): Promise<PaginationResult<T>> {

        const totalRecords = await repository.count();

        // Math.max garante pelo menos 1 página, assim uma tabela vazia não gera erro
        const lastPage = Math.max(Math.ceil(totalRecords / limit), 1);
        if (page < 1 || page > lastPage) {
            throw new Error(`Página Inválida! A página deve estar entre 1 e ${lastPage}.`);
        }

        const offset = (page - 1) * limit;
        const data = await repository.find({
            skip: offset,
            take: limit,
            order,
            // Só envia "relations" quando informada (exigência do exactOptionalPropertyTypes)
            ...(relations ? { relations } : {}),
        });

        return { error: false, data, currentPage: page, lastPage, totalRecords };
    }
}