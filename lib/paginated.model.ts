export class PaginatedModel<T>
{
    total: number
    list: T[]

    constructor(options: { total: number, list: T[] })
    {
        this.total = options.total
        this.list = options.list
    }
}