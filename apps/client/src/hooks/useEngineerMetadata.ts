import { EngineerService } from '@api/services';
import { QUERY_KEYS } from '@configs/query-client/query.keys';
import { useQueries } from 'react-query';

export function useEngineerMetadata() {
    const [exprienceQuery, positionsQuery, techLanguageQuery] = useQueries([
        {
            queryKey: QUERY_KEYS.EXPERIENCES,
            queryFn: EngineerService.getExperiences,
            initialData: [],
        },
        {
            queryKey: QUERY_KEYS.POSITIONS,
            queryFn: EngineerService.getPositions,
            initialData: [],
        },
        {
            queryKey: QUERY_KEYS.TECH_LANGUAGES,
            queryFn: EngineerService.getTechLanguages,
            initialData: [],
        },
    ]);

    return [exprienceQuery, positionsQuery, techLanguageQuery];
}
