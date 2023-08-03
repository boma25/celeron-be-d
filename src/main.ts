import { config } from 'dotenv';
config();
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AllowedHosts from './utils/cors';
import { MainCluster } from './main.cluster';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: AllowedHosts, credentials: true });

  const config = new DocumentBuilder()
    .setTitle('Celeron Bakcend')
    .setDescription('Celeron backend api documentation')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 4000;
  await app.listen(PORT, () => logger.log(`Server running on port ${PORT}`));
}
MainCluster.clusterize(bootstrap);
