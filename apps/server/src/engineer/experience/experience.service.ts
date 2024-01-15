import { Experience } from '@engineer/experience/experience.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExperienceService {
    public constructor(
        @InjectRepository(Experience)
        private readonly experienceRepository: Repository<Experience>,
    ) {}

    getAll(): Promise<Experience[]> {
        return this.experienceRepository.find();
    }
}
