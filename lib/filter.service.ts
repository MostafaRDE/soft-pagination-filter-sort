import { Injectable } from '@nestjs/common'
import { Filter } from './filter'

@Injectable()
export class FilterService<K>
{
    getQuery<T extends Filter<K>>(filter: T, data: K, ...args: unknown[]): any
    {
        return filter.getQuery(data, ...args)
    }
}