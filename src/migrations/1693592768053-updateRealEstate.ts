import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRealEstate1693592768053 implements MigrationInterface {
    name = 'UpdateRealEstate1693592768053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstates" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "realEstates" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "realEstates" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "realEstates" ALTER COLUMN "createdAt" DROP DEFAULT`);
    }

}
