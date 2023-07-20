import { Module } from '@nestjs/common'
import { BasePaginatedResponseInterceptor } from './base.paginated.response.interceptor'
import { FilterService } from './filter.service'

@Module({
    providers: [
        BasePaginatedResponseInterceptor,
        FilterService,
    ],
    exports: [
        BasePaginatedResponseInterceptor,
        FilterService,
    ],
})
export class SoftPaginationFilterSortModule {}