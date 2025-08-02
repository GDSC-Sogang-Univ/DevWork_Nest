import { ArticlesService } from './articles.service';
import { CursorPaginationDto, PaginatedResponse } from './dto/pagination.dto';
import { Article } from './entities/article.entity';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(paginationDto: CursorPaginationDto): Promise<PaginatedResponse<Article>>;
    findOne(id: string): Promise<Article>;
}
