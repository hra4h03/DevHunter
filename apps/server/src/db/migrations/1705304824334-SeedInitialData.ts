import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedInitialData1705301825286 implements MigrationInterface {
    public readonly experiences = [
        'Junior',
        'Mid Level',
        'Senior',
        'Principal',
        'Architect',
    ];

    public readonly positions = [
        'Full Stack',
        'Front End',
        'Back End',
        'DB Engineer',
    ];

    public readonly techLanguages = [
        'CSS',
        'JavaScript',
        'Python',
        'NodeJS',
        'ReactJS',
        'NextJS',
        'C++',
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO \`experience\` (\`name\`) VALUES ${this.experiences
                .map((experience) => `('${experience}')`)
                .join(', ')}`,
        );
        await queryRunner.query(
            `INSERT INTO \`position\` (\`name\`) VALUES ${this.positions
                .map((position) => `('${position}')`)
                .join(', ')}`,
        );
        await queryRunner.query(
            `INSERT INTO \`tech_language\` (\`name\`) VALUES ${this.techLanguages
                .map((techLanguage) => `('${techLanguage}')`)
                .join(', ')}`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM \`experience\``);
        queryRunner.query(`DELETE FROM \`position\``);
        queryRunner.query(`DELETE FROM \`tech_language\``);
    }
}
