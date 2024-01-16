import {
    EngineerModel,
    SubscriptionCreateModel,
    SubscriptionModel,
} from '@api/models';
import { useSocket } from '@hooks/useSocket';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useEngineerList(activeSubscription?: SubscriptionModel) {
    const [engineers, setEngineers] = useState<EngineerModel[]>([]);
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        if (!activeSubscription) return;

        const createSubscriptionDto: SubscriptionCreateModel = {
            experienceIds: activeSubscription.experiences.map((e) => e.id),
            techLanguageIds: activeSubscription.techLanguages.map((e) => e.id),
            positionIds: activeSubscription.positions.map((e) => e.id),
            minSalary: activeSubscription.minSalary,
            maxSalary: activeSubscription.maxSalary,
        };

        socket.emit('subscribe', createSubscriptionDto);
        socket.on('engineers', (engineers: EngineerModel[]) => {
            setEngineers(engineers);
        });

        socket.on('matched-engineers', (engineers: EngineerModel[]) => {
            engineers.forEach((e) => (e.isNew = true));
            setEngineers((e) => [...engineers, ...e]);
            toast.info('New engineers matched!');
        });

        return () => {
            socket.off('engineers');
            socket.off('matched-engineers');
        };
    }, [activeSubscription, socket]);

    return engineers;
}
