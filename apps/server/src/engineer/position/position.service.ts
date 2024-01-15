import { Position } from '@engineer/position/position.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PositionService {
    public constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,
    ) {}

    getAll(): Promise<Position[]> {
        return this.positionRepository.find();
    }
}
