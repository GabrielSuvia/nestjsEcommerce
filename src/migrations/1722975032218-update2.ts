import { MigrationInterface, QueryRunner } from "typeorm";

export class Update21722975032218 implements MigrationInterface {
    name = 'Update21722975032218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "date" TIMESTAMP`);
    }

}
