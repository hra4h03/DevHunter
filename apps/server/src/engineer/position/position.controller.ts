import { PositionService } from '@engineer/position/position.service';
import { Controller, Get } from '@nestjs/common';
import { PositionDto } from './dto/position.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('engineer/position')
@ApiTags('Engineer')
export class PositionController {
    constructor(private readonly positionService: PositionService) {}

    @Get('/')
    async getPosition() {
        const positions = await this.positionService.getAll();
        return PositionDto.fromEntities(positions);
    }
}
