import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerTheme } from 'swagger-themes';
import { HttpExceptionFilter } from './rest';

const APP_PORT = process.env.APP_PORT || 5010;
const GLOBAL_PREFIX = process.env.GLOBAL_PREFIX;
const PRODUCTION = process.env.APP_ENV === 'production';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
    }),
  );
  if (GLOBAL_PREFIX) {
    app.setGlobalPrefix(GLOBAL_PREFIX);
  }

  app.useGlobalFilters(new HttpExceptionFilter());

  if (!PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle('Mary Shelley Api')
      .setDescription('Core api for Saas')
      .setVersion('1.0')
      .addBearerAuth()
      .addSecurity('portal', {
        type: 'apiKey',
        name: 'x-portal',
        in: 'header',
      })
      .addSecurity('front-office', {
        type: 'apiKey',
        name: 'x-front-office',
        in: 'header',
      })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme('v3');
    const options = {
      customCss: theme.getBuffer('dark'),
    };
    SwaggerModule.setup('docs', app, document, options);
  }

  await app.listen(APP_PORT);
  Logger.log(`👻 Mary Shelley 👻 Running on: http://localhost:${GLOBAL_PREFIX ?
    `${GLOBAL_PREFIX}/${APP_PORT}` : APP_PORT}`
  );
}
bootstrap();
