import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { CursorPaginationDto, PaginatedResponse } from './dto/pagination.dto';
export declare class ArticlesService {
    private articleRepository;
    constructor(articleRepository: Repository<Article>);
    findAll(paginationDto: CursorPaginationDto): Promise<PaginatedResponse<Article>>;
    findOne(id: string): Promise<Article>;
}
