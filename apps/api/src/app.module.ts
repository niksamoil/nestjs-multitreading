import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'NATS_CLIENT',
        useFactory: () => ({
          transport: Transport.NATS,
          options: {
            // servers: ['nats://localhost:4222'],
            servers: ['nats://nats:4222'],
            queue: 'api-service',
          },
        }),
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
