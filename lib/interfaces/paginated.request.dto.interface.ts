import { SortTypesEnum } from '../sort-types.enum'

export interface PaginatedRequestDTOInterface<TFilter = Record<string, unknown>>
{
    page?: number
    size?: number
    offset?: number
    sort?: Record<string, SortTypesEnum>
    filter?: TFilter
}