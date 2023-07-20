export abstract class Filter<T>
{
    abstract getQuery(data: T, ...args: unknown[]): unknown
}