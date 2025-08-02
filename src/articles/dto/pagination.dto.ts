import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CursorPaginationDto {
  @IsOptional()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  limit?: number = 20;
}

export class PaginatedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasMore: boolean;

  constructor(data: T[], nextCursor: string | null, hasMore: boolean) {
    this.data = data;
    this.nextCursor = nextCursor;
    this.hasMore = hasMore;
  }
}