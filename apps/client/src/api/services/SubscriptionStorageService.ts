import { SubscriptionModel } from '@api/models';

const SUBSCRIPTION_KEY = 'subscriptions' as const;

export class SubscriptionStorageService {
    static add(subscription: SubscriptionModel): void {
        const subscriptions = this.get();
        subscriptions.push(subscription);

        localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscriptions));
    }

    static clear(): void {
        localStorage.removeItem(SUBSCRIPTION_KEY);
    }

    static get(): SubscriptionModel[] {
        const result = localStorage.getItem(SUBSCRIPTION_KEY);
        if (!result) return [];

        const subscriptions = JSON.parse(result) as Array<SubscriptionModel>;
        return subscriptions;
    }
}
