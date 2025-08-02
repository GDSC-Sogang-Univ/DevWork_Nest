import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../articles/entities/article.entity';
import { ArticleSeeder } from './article.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleSeeder],
  exports: [ArticleSeeder],
})
export class SeederModule {}