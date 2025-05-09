import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DATABASE'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        // entities: [
        //   User
        // ],
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      name: 'telemetryDB', // Connection name
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TELEMETRY_POSTGRES_HOST'),
        port: configService.get<number>('TELEMETRY_POSTGRES_PORT'),
        database: configService.get('TELEMETRY_POSTGRES_DATABASE'),
        username: configService.get('TELEMETRY_POSTGRES_USERNAME'),
        password: configService.get('TELEMETRY_POSTGRES_PASSWORD'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ConfigService],
})
export class DatabaseModule {}
