import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TechLanguage {
    static create(name: string) {
        const techLanguage = new TechLanguage();
        techLanguage.name = name;
        return techLanguage;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    public name: string;
}
