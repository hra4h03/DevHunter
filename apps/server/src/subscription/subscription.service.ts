import { Engineer } from '@engineer/engineer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionDto } from '@subscription/dto/subscription.dto';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {
    // keeping in memory for simplicity. service is instantiated only once
    private readonly subscriptions = new Map<string, Array<SubscriptionDto>>();

    constructor(
        @InjectRepository(Engineer)
        private readonly engineerRepository: Repository<Engineer>,
    ) {}

    public addSubscription(
        clientId: string,
        subscriptionDto: SubscriptionDto,
    ): Promise<Engineer[]> {
        if (!this.subscriptions.has(clientId)) {
            this.subscriptions.set(clientId, [subscriptionDto]);
        } else {
            this.subscriptions.set(
                clientId,
                this.subscriptions.get(clientId).concat(subscriptionDto),
            );
        }

        return this.getEngineersBySubscription(subscriptionDto);
    }

    public removeSubscription(clientId: string) {
        this.subscriptions.delete(clientId);
    }

    public getMatchedEngineers(engineers: Engineer[]) {
        const result = new Map<string, Engineer[]>();

        this.subscriptions.forEach((subscriptions, clientId) => {
            const matchedEngineers = engineers.filter((engineer) => {
                return subscriptions.some((subscription) =>
                    this.isMatchedEngineer(engineer, subscription),
                );
            });

            result.set(clientId, matchedEngineers);
        });

        return result;
    }

    private isMatchedEngineer(
        engineer: Engineer,
        subscription: SubscriptionDto,
    ): boolean {
        if (
            subscription?.minSalary &&
            engineer.minSalary < subscription.minSalary
        ) {
            return false;
        }

        if (
            subscription?.maxSalary &&
            engineer.maxSalary > subscription.maxSalary
        ) {
            return false;
        }

        if (
            subscription.experienceIds.length !== 0 &&
            !subscription.experienceIds.includes(engineer.experience.id)
        ) {
            return false;
        }

        if (
            subscription.positionIds.length !== 0 &&
            !subscription.positionIds.includes(engineer.position.id)
        ) {
            return false;
        }

        if (
            subscription.techLangugaeIds.length !== 0 &&
            !engineer.techLanguages.every((techLanguage) =>
                subscription.techLangugaeIds.includes(techLanguage.id),
            )
        ) {
            return false;
        }

        return true;
    }

    private getEngineersBySubscription(subscriptionDto: SubscriptionDto) {
        return this.engineerRepository.find({
            where: {
                minSalary: MoreThanOrEqual(subscriptionDto.minSalary),
                maxSalary: LessThanOrEqual(subscriptionDto.maxSalary),

                experience: {
                    id: In(subscriptionDto.experienceIds),
                },

                position: {
                    id: In(subscriptionDto.positionIds),
                },

                techLanguages: {
                    id: In(subscriptionDto.techLangugaeIds),
                },
            },
        });
    }
}
