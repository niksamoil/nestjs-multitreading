import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SomeServiceController } from './some-service.controller';
import { SomeServiceService } from './some-service.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'api-service',
        useFactory: () => ({
          transport: Transport.NATS,
          options: {
            servers: ['nats://localhost:4222'],
            queue: 'api-service',
          },
        }),
      },
    ]),
  ],
  controllers: [SomeServiceController],
  providers: [SomeServiceService],
})
export class SomeServiceModule {}
