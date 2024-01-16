import { ExperienceModel, PositionModel, TechLanguageModel } from '@api/models';

export interface SubscriptionCreateModel {
    minSalary: number;
    maxSalary: number;
    experienceIds: number[];
    techLanguageIds: number[];
    positionIds: number[];
}

export interface SubscriptionModel {
    uuid: string;
    minSalary: number;
    maxSalary: number;
    experiences: ExperienceModel[];
    techLanguages: TechLanguageModel[];
    positions: PositionModel[];
}
