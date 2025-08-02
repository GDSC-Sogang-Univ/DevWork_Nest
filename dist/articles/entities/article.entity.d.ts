import { BaseEntity } from '../../common/entities/base.entity';
import { ArticleStatus } from '../enums/article-status.enum';
export declare class Article extends BaseEntity {
    id: string;
    title: string;
    price: number;
    location: string;
    imageUrl: string;
    likeCount: number;
    chatCount: number;
    status: ArticleStatus;
    category: string;
    description: string;
    userId: string;
    userName: string;
}
