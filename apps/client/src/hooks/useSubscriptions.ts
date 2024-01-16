import { SubscriptionModel } from '@api/models';
import { SubscriptionStorageService } from '@api/services';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function useSubscriptions() {
    const [subscriptions, setSubscriptions] = useState<SubscriptionModel[]>(
        SubscriptionStorageService.get(),
    );
    const [activeSubscription, setActiveSubscription] =
        useState<SubscriptionModel>();

    const handleAddSubscription = (subscription: SubscriptionModel) => {
        setSubscriptions([...subscriptions, subscription]);
        SubscriptionStorageService.add(subscription);
        toast.success('Subscription added successfully');
    };

    useEffect(() => {
        if (subscriptions.length === 1) {
            setActiveSubscription(subscriptions[0]);
        }
    }, [subscriptions]);

    return {
        subscriptions,
        activeSubscription,
        handleAddSubscription,
        setActiveSubscription,
    };
}
