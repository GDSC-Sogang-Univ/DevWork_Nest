import {
  Controller,
  Get,
  Param,
  Query,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CursorPaginationDto, PaginatedResponse } from './dto/pagination.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(
    @Query(ValidationPipe) paginationDto: CursorPaginationDto,
  ): Promise<PaginatedResponse<Article>> {
    return this.articlesService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Article> {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }
}
