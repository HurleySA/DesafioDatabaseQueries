import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationGameGenrer1649392057687 implements MigrationInterface {
    name = 'RelationGameGenrer1649392057687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genrer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8ace312a97fdc292323578bb158" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "games_genres_genrer" ("gamesId" uuid NOT NULL, "genrerId" uuid NOT NULL, CONSTRAINT "PK_afddf69d68ff1757b2508a8dccc" PRIMARY KEY ("gamesId", "genrerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_365750ad077225a0e1942ca768" ON "games_genres_genrer" ("gamesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_80d0a7d4afd2f5478e7825a090" ON "games_genres_genrer" ("genrerId") `);
        await queryRunner.query(`ALTER TABLE "games_genres_genrer" ADD CONSTRAINT "FK_365750ad077225a0e1942ca768b" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games_genres_genrer" ADD CONSTRAINT "FK_80d0a7d4afd2f5478e7825a0903" FOREIGN KEY ("genrerId") REFERENCES "genrer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games_genres_genrer" DROP CONSTRAINT "FK_80d0a7d4afd2f5478e7825a0903"`);
        await queryRunner.query(`ALTER TABLE "games_genres_genrer" DROP CONSTRAINT "FK_365750ad077225a0e1942ca768b"`);
        await queryRunner.query(`DROP INDEX "IDX_80d0a7d4afd2f5478e7825a090"`);
        await queryRunner.query(`DROP INDEX "IDX_365750ad077225a0e1942ca768"`);
        await queryRunner.query(`DROP TABLE "games_genres_genrer"`);
        await queryRunner.query(`DROP TABLE "genrer"`);
    }

}
