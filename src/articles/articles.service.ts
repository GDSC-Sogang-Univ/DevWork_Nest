import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Article } from './entities/article.entity';
import { CursorPaginationDto, PaginatedResponse } from './dto/pagination.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findAll(paginationDto: CursorPaginationDto): Promise<PaginatedResponse<Article>> {
    const { cursor, limit = 20 } = paginationDto;

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .orderBy('article.createdAt', 'DESC')
      .addOrderBy('article.id', 'DESC')
      .take(limit + 1); // +1 to check if there are more items

    if (cursor) {
      // 커서에 해당하는 article을 먼저 찾아서 그 createdAt을 기준으로 함
      const cursorArticle = await this.articleRepository.findOne({
        where: { id: cursor },
      });

      if (cursorArticle) {
        queryBuilder.where(
          '(article.createdAt < :createdAt OR (article.createdAt = :createdAt AND article.id < :id))',
          {
            createdAt: cursorArticle.createdAt,
            id: cursorArticle.id,
          },
        );
      }
    }

    const articles = await queryBuilder.getMany();
    
    // hasMore 체크를 위해 limit+1개를 가져왔으므로, 실제로는 limit개만 반환
    const hasMore = articles.length > limit;
    const data = articles.slice(0, limit);
    const nextCursor = hasMore ? data[data.length - 1]?.id : null;

    return new PaginatedResponse(data, nextCursor, hasMore);
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    return article;
  }
}
