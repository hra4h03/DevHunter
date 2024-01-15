import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Position {
    static create(name: string) {
        const position = new Position();
        position.name = name;
        return position;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    public name: string;
}
