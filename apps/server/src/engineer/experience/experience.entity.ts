import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Experience {
    static create(name: string) {
        const experience = new Experience();
        experience.name = name;
        return experience;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    public name: string;
}
