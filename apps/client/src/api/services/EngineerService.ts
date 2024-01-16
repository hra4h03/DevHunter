import { ExperienceModel, PositionModel, TechLanguageModel } from '@api/models';
import { HttpClient } from '@api/services/HttpClient';

export class EngineerService {
    static async getTechLanguages() {
        const result = await HttpClient.get<Array<TechLanguageModel>>(`/engineer/tech-language`);
        return result.data;
    }

    static async getPositions() {
        const result = await HttpClient.get<Array<PositionModel>>(`/engineer/position`);
        return result.data;
    }

    static async getExperiences() {
        const result = await HttpClient.get<Array<ExperienceModel>>(`/engineer/experience`);
        return result.data;
    }

    static async generateEngineers() {
        const result = await HttpClient.post<boolean>(`/engineer/generate`);
        return result.data;
    }
}
