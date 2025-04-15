import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1744696462467 implements MigrationInterface {
    name = 'SchemaUpdate1744696462467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course_certificate" ADD "testTypeorm" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_course_certificate" DROP COLUMN "testTypeorm"`);
    }

}
