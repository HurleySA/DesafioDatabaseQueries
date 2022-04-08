import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateOrder1649392612500 implements MigrationInterface {
    name = 'CreateOrder1649392612500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_games_games" ("orderId" uuid NOT NULL, "gamesId" uuid NOT NULL, CONSTRAINT "PK_97a0bf716670955936f2bb95203" PRIMARY KEY ("orderId", "gamesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a59572bf43e96baf6d73f95530" ON "order_games_games" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a8edf1d8b1b1918c395b713601" ON "order_games_games" ("gamesId") `);
        await queryRunner.query(`CREATE TABLE "order_users_users" ("orderId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_f0ae470dc5b983e3dee6c8e166a" PRIMARY KEY ("orderId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f58e359a572b307edbece9eaeb" ON "order_users_users" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8235a27ec5d19a138316fae6a5" ON "order_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "order_games_games" ADD CONSTRAINT "FK_a59572bf43e96baf6d73f95530d" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_games_games" ADD CONSTRAINT "FK_a8edf1d8b1b1918c395b7136010" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_users_users" ADD CONSTRAINT "FK_f58e359a572b307edbece9eaeb9" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_users_users" ADD CONSTRAINT "FK_8235a27ec5d19a138316fae6a55" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_users_users" DROP CONSTRAINT "FK_8235a27ec5d19a138316fae6a55"`);
        await queryRunner.query(`ALTER TABLE "order_users_users" DROP CONSTRAINT "FK_f58e359a572b307edbece9eaeb9"`);
        await queryRunner.query(`ALTER TABLE "order_games_games" DROP CONSTRAINT "FK_a8edf1d8b1b1918c395b7136010"`);
        await queryRunner.query(`ALTER TABLE "order_games_games" DROP CONSTRAINT "FK_a59572bf43e96baf6d73f95530d"`);
        await queryRunner.query(`DROP INDEX "IDX_8235a27ec5d19a138316fae6a5"`);
        await queryRunner.query(`DROP INDEX "IDX_f58e359a572b307edbece9eaeb"`);
        await queryRunner.query(`DROP TABLE "order_users_users"`);
        await queryRunner.query(`DROP INDEX "IDX_a8edf1d8b1b1918c395b713601"`);
        await queryRunner.query(`DROP INDEX "IDX_a59572bf43e96baf6d73f95530"`);
        await queryRunner.query(`DROP TABLE "order_games_games"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
