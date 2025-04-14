import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TaskModule } from './task/task.module';
import 'dotenv/config';
import { SeedersModule } from './seeders/seeders.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_URL,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASENAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [`${__dirname}/migration/*{.ts,.js}`],
      migrationsRun: true,
      schema: process.env.SCHEMA ? process.env.SCHEMA : 'public',
    }),
    AuthModule,
    TaskModule,
    SeedersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
