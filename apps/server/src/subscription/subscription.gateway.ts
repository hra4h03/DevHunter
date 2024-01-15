import { Engineer } from '@engineer/engineer.entity';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { SubscriptionDto } from '@subscription/dto/subscription.dto';
import { SubscriptionService } from '@subscription/subscription.service';
import { Server, Socket } from 'socket.io';
import { EngineerDto } from '../engineer/dto/engineer.dto';

@WebSocketGateway({ cors: true })
export class SubscriptionGateway {
    private readonly logger = new Logger(SubscriptionGateway.name);

    @WebSocketServer()
    private server: Server;

    constructor(private readonly subscriptionService: SubscriptionService) {}

    handleConnection(client: Socket) {
        this.logger.log(`client-connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`client-disconnected: ${client.id}`);
        this.subscriptionService.removeSubscription(client.id);
    }

    @SubscribeMessage('subscribe')
    async addSubscription(client: Socket, subscriptionDto: SubscriptionDto) {
        this.logger.log(`subscribe: ${client.id}`);
        const engineers = await this.subscriptionService.addSubscription(
            client.id,
            subscriptionDto,
        );

        client.send('engineers', EngineerDto.fromEntities(engineers));
    }

    @OnEvent('engineers.generated')
    handleInformMatchedEngineers(engineers: Engineer[]) {
        this.logger.log(`engineers-generated: ${engineers.length}`);
        const result = this.subscriptionService.getMatchedEngineers(engineers);

        result.forEach((matchedEngineers, clientId) => {
            this.logger.log(`inform-matched-engineers: ${clientId}`);
            this.server
                .to(clientId)
                .emit('matched-engineers', matchedEngineers);
        });
    }
}
