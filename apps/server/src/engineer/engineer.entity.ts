import { Experience } from '@engineer/experience/experience.entity';
import { Position } from '@engineer/position/position.entity';
import { TechLanguage } from '@engineer/techLanguage/techLanguage.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Engineer {
    static create({ fullName, minSalary, maxSalary }): Engineer {
        const newEngineer = new Engineer();
        newEngineer.fullName = fullName;
        newEngineer.minSalary = minSalary;
        newEngineer.maxSalary = maxSalary;
        return newEngineer;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    public fullName: string;

    @ManyToMany(() => TechLanguage, { cascade: true, eager: true })
    @JoinTable()
    public techLanguages: Array<TechLanguage>;

    @ManyToOne(() => Experience, { cascade: true, eager: true })
    @JoinColumn()
    public experience: Experience;

    @ManyToOne(() => Position, { cascade: true, eager: true })
    @JoinColumn()
    public position: Position;

    @Column({ type: 'int' })
    public minSalary: number;

    @Column({ type: 'int' })
    public maxSalary: number;

    setExperience(experience: Experience): void {
        this.experience = experience;
    }

    setPosition(position: Position): void {
        this.position = position;
    }

    setTechLanguages(techLanguages: Array<TechLanguage>): void {
        this.techLanguages = techLanguages;
    }
}
