"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./entities/article.entity");
const pagination_dto_1 = require("./dto/pagination.dto");
let ArticlesService = class ArticlesService {
    articleRepository;
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    async findAll(paginationDto) {
        const { cursor, limit = 20 } = paginationDto;
        const queryBuilder = this.articleRepository
            .createQueryBuilder('article')
            .orderBy('article.createdAt', 'DESC')
            .addOrderBy('article.id', 'DESC')
            .take(limit + 1);
        if (cursor) {
            const cursorArticle = await this.articleRepository.findOne({
                where: { id: cursor },
            });
            if (cursorArticle) {
                queryBuilder.where('(article.createdAt < :createdAt OR (article.createdAt = :createdAt AND article.id < :id))', {
                    createdAt: cursorArticle.createdAt,
                    id: cursorArticle.id,
                });
            }
        }
        const articles = await queryBuilder.getMany();
        const hasMore = articles.length > limit;
        const data = articles.slice(0, limit);
        const nextCursor = hasMore ? data[data.length - 1]?.id : null;
        return new pagination_dto_1.PaginatedResponse(data, nextCursor, hasMore);
    }
    async findOne(id) {
        const article = await this.articleRepository.findOne({
            where: { id },
        });
        if (!article) {
            throw new common_1.NotFoundException(`Article with ID ${id} not found`);
        }
        return article;
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map