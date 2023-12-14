import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { PaginatedRequestDTOInterface } from './interfaces/paginated.request.dto.interface'
import { PaginatedResponseDTOInterface } from './interfaces/paginated.response.dto.interface'
import { PaginatedModel } from './paginated.model'

@Injectable()
export class BasePaginatedResponseInterceptor<TData, TModel extends PaginatedModel<TData>>
{
    intercept(context: ExecutionContext, next: CallHandler): Observable<PaginatedResponseDTOInterface<TData>>
    {
        const query = context.switchToHttp().getRequest().query as PaginatedRequestDTOInterface

        if (typeof query.page === 'string') query.page = Number.parseInt(`${ query.page }`)
        if (typeof query.size === 'string') query.size = Number.parseInt(`${ query.size }`)
        if (typeof query.offset === 'string') query.offset = Number.parseInt(`${ query.offset }`)

        return next.handle().pipe(map((value: TModel) => this.buildResponse(value, query)))
    }

    buildResponse<TMoreData = Record<string, unknown>>(
        value: TModel,
        request: PaginatedRequestDTOInterface,
        moreData?: TMoreData,
    )
    {
        return {
            list: value.list,
            page: request.page,
            size: request.size,
            hasPrevPage: typeof request?.page === 'number' && request?.page > 1,
            hasNextPage: (typeof request?.page === 'number' && typeof request?.size === 'number')
                && request?.page * request?.size < value?.total,
            total: value.total,
            ...moreData,
        } as PaginatedResponseDTOInterface<TData>
    }
}