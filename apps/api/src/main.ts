// Without clustering
// import { NestFactory } from '@nestjs/core';
// import { MicroserviceOptions } from '@nestjs/microservices';
// import { AppModule } from './app.module';
// import { AugmentedNatsTransport } from '@app/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {
//     logger: ['error', 'warn', 'log'],
//   });

//   app.connectMicroservice<MicroserviceOptions>({
//     strategy: new AugmentedNatsTransport({
//       // servers: ['nats://localhost:4222'],
//       servers: ['nats://nats:4222'],
//       queue: 'api-service',
//     }),
//   });

//   await app.startAllMicroservices();
//   await app.listen(3001);
// }
// void bootstrap();

// CLUSTERING
import cluster from 'node:cluster';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppClusterService, AugmentedNatsTransport } from '@app/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new AugmentedNatsTransport({
      // servers: ['nats://localhost:4222'],
      servers: ['nats://nats:4222'],
      queue: 'api-service',
    }),
  });

  await app.startAllMicroservices();

  await app.listen(3001 + (cluster.worker.id - 1), () => {
    console.log(
      `Application is running on port: ${3001 + (cluster.worker.id - 1)}`,
    );
  });
}

AppClusterService.clusterize(bootstrap);

// Run the following commands in PowerShell:
// $urls = "http://localhost:3001/heavy", "http://localhost:3001", "http://localhost:3001/other"
// $requests = $urls | % {Start-Job -ScriptBlock {param($url) Invoke-WebRequest -Uri $url -UseBasicParsing -Method Get} -ArgumentList $_}
// Receive-Job -Job $requests -Wait -AutoRemoveJob | ForEach-Object { $_.Content }
