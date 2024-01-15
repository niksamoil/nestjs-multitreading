import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SomeServiceModule } from './some-service.module';
import { AppClusterService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SomeServiceModule,
    {
      transport: Transport.NATS,
      options: {
        // servers: ['nats://localhost:4222'],
        servers: ['nats://nats:4222'],
        queue: 'api-service',
      },
    },
  );
  await app.listen();
}

AppClusterService.clusterize(bootstrap);
