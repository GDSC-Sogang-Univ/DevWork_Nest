import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { ArticleStatus } from '../enums/article-status.enum';

@Entity('articles')
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar', length: 100 })
  location: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @Column({ type: 'int', default: 0 })
  chatCount: number;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.SALE,
  })
  status: ArticleStatus;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  userId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  userName: string;
}