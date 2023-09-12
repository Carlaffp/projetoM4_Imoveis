import { MigrationInterface, QueryRunner } from "typeorm";

export class OrganizeMigration1693589932622 implements MigrationInterface {
    name = 'OrganizeMigration1693589932622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstates" RENAME COLUMN "updateddAt" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstates" RENAME COLUMN "updatedAt" TO "updateddAt"`);
    }

}
