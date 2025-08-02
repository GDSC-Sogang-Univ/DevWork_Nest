import { Repository } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';
export declare class ArticleSeeder {
    private articleRepository;
    constructor(articleRepository: Repository<Article>);
    seed(): Promise<void>;
    private generateMockArticles;
    private getRandomElement;
}
