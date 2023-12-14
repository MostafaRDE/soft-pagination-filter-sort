import { Filter } from './filter';
export declare class FilterService<K> {
    getQuery<T extends Filter<K>>(filter: T, data: K, ...args: unknown[]): any;
}
