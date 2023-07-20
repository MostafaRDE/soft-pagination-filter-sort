import { Global, Module } from '@nestjs/common'
import { BasePaginatedResponseInterceptor } from './base.paginated.response.interceptor'

@Global()
@Module({
    providers: [
        BasePaginatedResponseInterceptor,
    ],
    exports: [
        BasePaginatedResponseInterceptor,
    ],
})
export class SoftPaginationFilterSortModule {}