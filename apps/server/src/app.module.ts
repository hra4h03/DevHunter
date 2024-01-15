import { DbModule } from '@db/db.module';
import { EngineerModule } from '@engineer/engineer.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionModule } from '@subscription/subscription.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

const modules = [EngineerModule, SubscriptionModule];

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: '../../.env',
            isGlobal: true,
        }),
        DbModule,
        ...modules,
    ],
})
export class AppModule {}
