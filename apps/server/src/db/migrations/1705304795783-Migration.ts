import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705304795783 implements MigrationInterface {
    name = 'Migration1705304795783';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`experience\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`position\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`tech_language\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`engineer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`full_name\` varchar(255) NOT NULL, \`min_salary\` int NOT NULL, \`max_salary\` int NOT NULL, \`experience_id\` int NULL, \`position_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`engineer_tech_languages_tech_language\` (\`engineer_id\` int NOT NULL, \`tech_language_id\` int NOT NULL, INDEX \`IDX_c233859aa43b55a8b9a3aa83d9\` (\`engineer_id\`), INDEX \`IDX_66a2fd6af8afde6d779202f0bf\` (\`tech_language_id\`), PRIMARY KEY (\`engineer_id\`, \`tech_language_id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`engineer\` ADD CONSTRAINT \`FK_d5ed6aa6e243ed876c670fbde79\` FOREIGN KEY (\`experience_id\`) REFERENCES \`experience\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`engineer\` ADD CONSTRAINT \`FK_7d4df91ea2a033091f0b56dc33b\` FOREIGN KEY (\`position_id\`) REFERENCES \`position\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`engineer_tech_languages_tech_language\` ADD CONSTRAINT \`FK_c233859aa43b55a8b9a3aa83d93\` FOREIGN KEY (\`engineer_id\`) REFERENCES \`engineer\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE \`engineer_tech_languages_tech_language\` ADD CONSTRAINT \`FK_66a2fd6af8afde6d779202f0bf9\` FOREIGN KEY (\`tech_language_id\`) REFERENCES \`tech_language\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`engineer_tech_languages_tech_language\` DROP FOREIGN KEY \`FK_66a2fd6af8afde6d779202f0bf9\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`engineer_tech_languages_tech_language\` DROP FOREIGN KEY \`FK_c233859aa43b55a8b9a3aa83d93\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`engineer\` DROP FOREIGN KEY \`FK_7d4df91ea2a033091f0b56dc33b\``,
        );
        await queryRunner.query(
            `ALTER TABLE \`engineer\` DROP FOREIGN KEY \`FK_d5ed6aa6e243ed876c670fbde79\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_66a2fd6af8afde6d779202f0bf\` ON \`engineer_tech_languages_tech_language\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_c233859aa43b55a8b9a3aa83d9\` ON \`engineer_tech_languages_tech_language\``,
        );
        await queryRunner.query(
            `DROP TABLE \`engineer_tech_languages_tech_language\``,
        );
        await queryRunner.query(
            `DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` ON \`user\``,
        );
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`engineer\``);
        await queryRunner.query(`DROP TABLE \`tech_language\``);
        await queryRunner.query(`DROP TABLE \`position\``);
        await queryRunner.query(`DROP TABLE \`experience\``);
    }
}
