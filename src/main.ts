import { config } from 'dotenv';
config();
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AllowedHosts from './utils/cors';
import { MainCluster } from './main.cluster';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: AllowedHosts, credentials: true }); //is this needed
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, () => logger.log(`Server running on port ${PORT}`));
}
MainCluster.clusterize(bootstrap);
