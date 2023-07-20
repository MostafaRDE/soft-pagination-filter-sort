export declare class PaginatedModel<T> {
    total: number;
    list: T[];
    constructor(options: {
        total: number;
        list: T[];
    });
}
