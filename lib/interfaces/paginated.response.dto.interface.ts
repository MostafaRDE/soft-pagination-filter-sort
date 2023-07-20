export interface PaginatedResponseDTOInterface<TData>
{
    total: number
    page?: number
    size?: number
    hasPrevPage: boolean
    hasNextPage: boolean
    list: TData[]
}