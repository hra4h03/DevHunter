import { EngineerService } from '@engineer/engineer.service';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('engineer')
@ApiTags('Engineer')
export class EngineerController {
    constructor(private readonly engineerService: EngineerService) {}

    @Post('/generate')
    generateEngineers(): Promise<boolean> {
        return this.engineerService.generateEngineers();
    }
}
