import { Experience } from '@engineer/experience/experience.entity';
import { Position } from '@engineer/position/position.entity';
import { TechLanguage } from '@engineer/techLanguage/techLanguage.entity';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Engineer } from './engineer.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EngineerService {
    public constructor(
        @InjectRepository(Engineer)
        private readonly engineerRepository: Repository<Engineer>,
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>,
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,
        @InjectRepository(TechLanguage)
        private readonly techLanguageRepository: Repository<TechLanguage>,
        private readonly eventEmmitter: EventEmitter2,
    ) {}

    public async generateEngineers(count: number = 50): Promise<true> {
        const [allExperiences, allPositions, allTechLanguages] =
            await Promise.all([
                this.experienceRepository.find(),
                this.positionRepository.find(),
                this.techLanguageRepository.find(),
            ]);

        const engineers: Engineer[] = [];
        for (let i = 0; i < count; i++) {
            const fullName = faker.person.fullName();
            const minSalary = faker.number.int({
                min: 10,
                max: 30,
            });
            const maxSalary = faker.number.int({
                min: minSalary,
                max: 40,
            });

            const engineer = Engineer.create({
                fullName,
                minSalary: minSalary * 50000,
                maxSalary: maxSalary * 50000,
            });

            engineer.setExperience(this.getRandomElement(allExperiences));
            engineer.setPosition(this.getRandomElement(allPositions));
            engineer.setTechLanguages(this.getRandomElements(allTechLanguages));

            engineers.push(engineer);
        }

        const savedEngineers = await this.engineerRepository.save(engineers, {
            chunk: 100, // save 100 engineers at a time
        });

        this.eventEmmitter.emit('engineers.generated', savedEngineers);

        return true;
    }

    private getRandomElement<T>(array: Array<T>): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    private getRandomElements<T>(array: Array<T>): T[] {
        const randomElements: T[] = [];
        const taken = new Set();
        for (let i = 0; i < Math.round(array.length / 2); i++) {
            const index = Math.floor(Math.random() * array.length);
            if (taken.has(index)) {
                continue;
            }
            const element = array[index];
            taken.add(index);
            randomElements.push(element);
        }
        return randomElements;
    }
}
