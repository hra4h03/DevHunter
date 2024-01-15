import { ExperienceService } from '@engineer/experience/experience.service';
import { Controller, Get } from '@nestjs/common';
import { ExperienceDto } from './dto/experience.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('engineer/experience')
@ApiTags('Engineer')
export class ExperienceController {
    constructor(private readonly experienceService: ExperienceService) {}

    @Get('/')
    async getExperience() {
        const experiences = await this.experienceService.getAll();
        return ExperienceDto.fromEntities(experiences);
    }
}
