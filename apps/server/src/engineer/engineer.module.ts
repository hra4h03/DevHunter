import { EngineerController } from '@engineer/engineer.controller';
import { Engineer } from '@engineer/engineer.entity';
import { EngineerService } from '@engineer/engineer.service';
import { ExperienceController } from '@engineer/experience/experience.controller';
import { Experience } from '@engineer/experience/experience.entity';
import { ExperienceService } from '@engineer/experience/experience.service';
import { PositionController } from '@engineer/position/position.controller';
import { Position } from '@engineer/position/position.entity';
import { PositionService } from '@engineer/position/position.service';
import { TechLanguageController } from '@engineer/techLanguage/techLanguage.controller';
import { TechLanguage } from '@engineer/techLanguage/techLanguage.entity';
import { TechLanguageService } from '@engineer/techLanguage/techLanguage.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Engineer,
            TechLanguage,
            Position,
            Experience,
        ]),
    ],
    providers: [
        ExperienceService,
        EngineerService,
        TechLanguageService,
        PositionService,
    ],
    controllers: [
        EngineerController,
        TechLanguageController,
        PositionController,
        ExperienceController,
    ],
})
export class EngineerModule {}
