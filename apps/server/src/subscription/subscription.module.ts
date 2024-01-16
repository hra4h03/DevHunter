import { Engineer } from '@engineer/engineer.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionGateway } from './subscription.gateway';
import { SubscriptionService } from './subscription.service';

@Module({
    imports: [TypeOrmModule.forFeature([Engineer])],
    providers: [SubscriptionGateway, SubscriptionService],
})
export class SubscriptionModule {}
