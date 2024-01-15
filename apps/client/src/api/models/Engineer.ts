import { ExperienceModel, PositionModel, TechLanguageModel } from ".";

export interface EngineerModel {
  id: number;
  fullName: string;
  minSalary: number;
  maxSalary: number;
  experience: ExperienceModel;
  techLanguages: TechLanguageModel[];
  position: PositionModel;
}
