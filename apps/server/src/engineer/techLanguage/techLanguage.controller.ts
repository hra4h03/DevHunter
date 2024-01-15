import { TechLanguageService } from '@engineer/techLanguage/techLanguage.service';
import { Controller, Get } from '@nestjs/common';
import { TechLanguageDto } from './dto/techLanguage.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('engineer/tech-language')
@ApiTags('Engineer')
export class TechLanguageController {
    constructor(private readonly techLanguageService: TechLanguageService) {}

    @Get('/')
    async getTechLanguage() {
        const techLanguages = await this.techLanguageService.getAll();
        return TechLanguageDto.fromEntities(techLanguages);
    }
}
