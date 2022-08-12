import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as csurf from 'csurf';

import { AppModule } from './app.module';
import { Response } from 'express';
import { randomBytes } from 'crypto';

import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }),
  );

  //##########################################################################################
  // Development environment
  if (process.env.ENV === 'Development') { 

    app.enableCors()

    const config = new DocumentBuilder()
      .setTitle('UnityCitys API Documentation')
      .setDescription('The UnityCitys API description')
      .setVersion('1.0')
      .addTag('UnityCitys')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

  }

  // Production environment
  if (process.env.ENV === 'Production') { 
    app.use((req, res: Response, next) => {
      res.locals.cspNonce = randomBytes(16).toString('hex');
      next();
    });
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'strict-dynamic'",
            (req, res: Response) => `'nonce-${res.locals.cspNonce}'`,
            "'unsafe-inline' http: https:",
          ],
          objectSrc: ["'none'"],
          'base-uri': ["'none'"],
          'require-trusted-types': ["'script'"],
          frameAncestors: ["'none'"],
          'report-uri': [''],
          upgradeInsecureRequests: [],
        },
      }),
    );
    app.use(cookieParser());

    app.use(
      csurf({
        cookie: {
          httpOnly: true,
          sameSite: true,
          secure: true,
          key: 'authorization',
        },
        ignoreMethods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
      }),
    );

    app.enableCors({ origin: '' });

  }
  //##########################################################################################

  app.setGlobalPrefix('api');
  await app.listen(process.env.APP_PORT, () => {
    console.log(`Env `, process.env.ENV);
  });
}
bootstrap();
