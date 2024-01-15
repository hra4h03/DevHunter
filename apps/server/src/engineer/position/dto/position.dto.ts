import { Position } from '@engineer/position/position.entity';

export class PositionDto {
    static fromEntity(entity: Position): PositionDto {
        const dto = new PositionDto();
        dto.id = entity.id;
        dto.name = entity.name;
        return dto;
    }

    static fromEntities(entities: Position[]): PositionDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    public id: number;
    public name: string;
}
