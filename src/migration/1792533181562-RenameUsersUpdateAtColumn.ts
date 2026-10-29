import type { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUsersUpdateAtColumn1792533181562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "updateAt", "updatedAt")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "updatedAt", "updateAt")
    }
}