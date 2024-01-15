import { TechLanguage } from '@engineer/techLanguage/techLanguage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TechLanguageService {
    public constructor(
        @InjectRepository(TechLanguage)
        private readonly techLanguageRepository: Repository<TechLanguage>,
    ) {}

    getAll(): Promise<TechLanguage[]> {
        return this.techLanguageRepository.find();
    }
}
