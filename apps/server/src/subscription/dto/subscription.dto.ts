import { IsNumber, Min } from 'class-validator';

export class SubscriptionDto {
    @IsNumber({}, { each: true })
    public techLanguageIds: number[] = [];

    @IsNumber({}, { each: true })
    public experienceIds: number[] = [];

    @IsNumber()
    @Min(0)
    public minSalary: number;

    @IsNumber()
    @Min(0)
    public maxSalary: number;

    @IsNumber({}, { each: true })
    public positionIds: number[] = [];
}
