import { ExperienceModel, PositionModel, TechLanguageModel } from '@api/models';
import { HttpClient } from '@api/services/HttpClient';

export class EngineerService {
    static async getTechLanguages() {
        return await HttpClient.get<Array<TechLanguageModel>>(`/engineer/tech-language`);
    }

    static async getPositions() {
        return await HttpClient.get<Array<PositionModel>>(`/engineer/position`);
    }

    static async getExperiences() {
        return await HttpClient.get<Array<ExperienceModel>>(`/engineer/experience`);
    }

    static async generateEngineers() {
        return await HttpClient.post<boolean>(`/engineer/generate`);
    }
}
