import { Engineer } from '@engineer/engineer.entity';
import { ExperienceDto } from '@engineer/experience/dto/experience.dto';
import { PositionDto } from '@engineer/position/dto/position.dto';
import { TechLanguageDto } from '@engineer/techLanguage/dto/techLanguage.dto';

export class EngineerDto {
    static fromEntity(entity: Engineer): EngineerDto {
        const dto = new EngineerDto();
        dto.id = entity.id;
        dto.fullName = entity.fullName;
        dto.minSalary = entity.minSalary;
        dto.maxSalary = entity.maxSalary;

        dto.experience = ExperienceDto.fromEntity(entity.experience);
        dto.position = PositionDto.fromEntity(entity.position);
        dto.techLanguages = TechLanguageDto.fromEntities(entity.techLanguages);

        return dto;
    }

    static fromEntities(entities: Engineer[]): EngineerDto[] {
        return entities.map((entity) => this.fromEntity(entity));
    }

    public id: number;
    public fullName: string;
    public minSalary: number;
    public maxSalary: number;

    public experience: ExperienceDto;
    public position: PositionDto;
    public techLanguages: TechLanguageDto[];
}
