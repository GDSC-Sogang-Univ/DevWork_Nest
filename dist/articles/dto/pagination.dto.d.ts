export declare class CursorPaginationDto {
    cursor?: string;
    limit?: number;
}
export declare class PaginatedResponse<T> {
    data: T[];
    nextCursor: string | null;
    hasMore: boolean;
    constructor(data: T[], nextCursor: string | null, hasMore: boolean);
}
