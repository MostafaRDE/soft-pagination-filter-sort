import { CallHandler, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PaginatedRequestDTOInterface } from './interfaces/paginated.request.dto.interface';
import { PaginatedResponseDTOInterface } from './interfaces/paginated.response.dto.interface';
import { PaginatedModel } from './paginated.model';
export declare class BasePaginatedResponseInterceptor<TData, TModel extends PaginatedModel<TData>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<PaginatedResponseDTOInterface<TData>>;
    buildResponse<TMoreData = Record<string, unknown>>(value: TModel, request: PaginatedRequestDTOInterface, moreData?: TMoreData): PaginatedResponseDTOInterface<TData>;
}
