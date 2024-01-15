import { TechLanguage } from '@engineer/techLanguage/techLanguage.entity';

export class TechLanguageDto {
    static fromEntity(entity: TechLanguage): TechLanguageDto {
        const dto = new TechLanguageDto();
        dto.id = entity.id;
        dto.name = entity.name;
        return dto;
    }

    static fromEntities(entities: TechLanguage[]): TechLanguageDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    public id: number;
    public name: string;
}
