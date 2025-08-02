import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Article } from '../articles/entities/article.entity';
import { ArticleSeeder } from './seeders/article.seeder';
import { SeederModule } from './seeders/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [Article],
        synchronize: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    SeederModule,
  ],
})
class SeedModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  try {
    const seeder = app.get(ArticleSeeder);
    await seeder.seed();
    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap().catch((error) => {
  console.error('Fatal error during seeding:', error);
  process.exit(1);
});
