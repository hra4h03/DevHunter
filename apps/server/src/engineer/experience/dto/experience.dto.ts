import { Experience } from '@engineer/experience/experience.entity';

export class ExperienceDto {
    static fromEntity(entity: Experience): ExperienceDto {
        const dto = new ExperienceDto();
        dto.id = entity.id;
        dto.name = entity.name;
        return dto;
    }

    static fromEntities(entities: Experience[]): ExperienceDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    public id: number;
    public name: string;
}
