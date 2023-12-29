// Without clustering
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

// CLUSTERING
import cluster from 'node:cluster';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppClusterService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.startAllMicroservices();
  await app.listen(3000 + (cluster.worker.id - 1));
}

AppClusterService.clusterize(bootstrap);

// Run the following commands in PowerShell:
// $urls = "http://localhost:3000/heavy", "http://localhost:3000", "http://localhost:3000/other"
// $requests = $urls | % {Start-Job -ScriptBlock {param($url) Invoke-WebRequest -Uri $url -UseBasicParsing -Method Get} -ArgumentList $_}
// Receive-Job -Job $requests -Wait -AutoRemoveJob | ForEach-Object { $_.Content }
