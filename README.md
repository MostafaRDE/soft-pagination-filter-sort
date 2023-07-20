<h1 align="center">Nestjs / Soft Pagination Filter Sort</h1>

<div align="center">

Created for solving advanced paginating, advanced filtering and advanced sorting with contributing Front-end developers in the **Nestjs Back-end framework**.

[![npm package](https://img.shields.io/npm/v/nestjs-soft-pagination-filter-sort?logo=npm&style=flat-square)](https://www.npmjs.org/package/nestjs-soft-pagination-filter-sort)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## 📦 Install

```sh
npm i nestjs-soft-pagination-filter-sort
```

<br/>

> ✍️ **Note:** With this package you can adapting all communications between ORMs, APIs, data storage and etc with your application by one code style using ***filters***.

## 🚀 Usage

### 0- 💉 Importing module

```ts
import { SoftPaginationFilterSortModule } from 'nestjs-soft-pagination-filter-sort'
@Module({
    imports: [
        SoftPaginationFilterSortModule,
    ],
})
```

### 1- 📃 Pagination

#### 1-1- Simple implementation

You must use the pagination interceptor

- Request

```json
{
    "page": 1,
    "size": 2,
    "offset": 0,
    "sort": { "id": "asc" },
    "filter": {}
}
```

- Response

```json
{
    "total": 10,
    "page": 1,
    "size": 2,
    "hasPrevPage": false,
    "hasNextPage": true,
    "list": [
        { "id": 1, "name": "Tomas", "color": "gray" },
        { "id": 2, "name": "Anna", "color": "white" }
    ]
}
```

- Controller

```ts
import {
    BasePaginatedResponseInterceptor,
    PaginatedModel,
    PaginatedRequestDTOInterface,
} from 'nestjs-soft-pagination-filter-sort'

@Controller('cat')
export class CatController
{
    @UseInterceptors(BasePaginatedResponseInterceptor<YourModel, PaginatedModel<YourModel>>)
    @Get()
    getAll(@Query() paginatedRequestDTO: PaginatedRequestDTOInterface)
    {
        return {
            total: 10,
            list: [
                { id: 1, name: 'Tomas', color: 'gray' },
                { id: 2, name: 'Anna', color: 'white' },
            ],
        }
    }
}
```

### 1-2- Advanced implementation

> ✍️ **Note:** You can add change of DTOs of request or response of pagination system.

- Request DTO

```ts
import { PaginatedRequestDTOInterface } from 'nestjs-soft-pagination-filter-sort'

export class PaginatedRequestDTO implements PaginatedRequestDTOInterface
{
    page?: number
    size?: number
    offset?: number
    sort?: Record<string, SortTypesEnum>
    filter?: TFilter
}
```

- Response DTO

```ts
import { PaginatedResponseDTOInterface } from 'nestjs-soft-pagination-filter-sort'

export class PaginatedResponseDTO<TData> implements PaginatedResponseDTOInterface<TData>
{
    status: 'success' | 'warning' | 'error'
    total: number
    page?: number
    size?: number
    hasPrevPage: boolean
    hasNextPage: boolean
    list: TData[]
}
```

- Custom pagination interceptor

> ✍️ **Note:** You must import custom interceptor as global for usage in all modules without any imports in another modules.


```ts
import { BasePaginatedResponseInterceptor } from 'nestjs-soft-pagination-filter-sort'

export class PaginatedResponseInterceptor<TData, TModel extends PaginatedModel<TData>>
    extends BasePaginatedResponseInterceptor<TData, TModel>
{
    intercept(context: ExecutionContext, next: CallHandler): Observable<PaginatedResponseDTO<TData>>
    {
        // If you changes request or response DTOs, You can handles those here or
        // customize of all them.

        const query = context.switchToHttp().getRequest().query as PaginatedResponseDTO

        if (typeof query.page === 'string') query.page = Number.parseInt(`${ query.page }`)
        if (typeof query.size === 'string') query.size = Number.parseInt(`${ query.size }`)
        if (typeof query.offset === 'string') query.offset = Number.parseInt(`${ query.offset }`)

        return next.handle().pipe(map((value: TModel) => super.buildResponse<
            { status: 'success' | 'warning' | 'errpr' }
        >(value, query, { status: 'success' })))
    }
}
```

#### Example

- Request

```json
{
    "page": 1,
    "size": 2,
    "offset": 0,
    "sort": { "id": "asc" },
    "filter": {}
}
```

- Response (In the response, status ***key*** added by interceptor automatically)

```json
{
    "status": "success",
    "total": 10,
    "page": 1,
    "size": 2,
    "hasPrevPage": false,
    "hasNextPage": true,
    "list": [
        { "id": 1, "name": "Tomas", "color": "gray" },
        { "id": 2, "name": "Anna", "color": "white" }
    ]
}
```

### 2- 🔎 Filter with Sort

You can create main filter class for each ORMs, API repositories or any data storages and filter all of them with own structure! 😎❤️

#### Sequelize example

1. Create filter class for sequelize

> ✍️ **Note:** You can set the below class as abstract or not by your decision. If you want create a base structure for your filtering, you can set it as a class or, set the it as a abstract class and create custom filters for all data getters such as repositories.

```ts
import { FindOptions } from 'sequelize'
import { Filter } from 'nestjs-soft-pagination-filter-sort'

export class SequelizeFilter<T> extends Filter<T>
{
    getQuery(data: T): FindOptions<T>
    {
        return {}
    }
}
```

2. Create custom filter for get cats

```ts
export class CatsGetAllDatabaseSequelizeFilter extends SequelizeFilter<{ color: string }>
{
    getQuery(data?: { color: string }, name?: string):
        FindOptions<{ color: string }>
    {
        const filter: FindOptions<T> = {}

        // Your operations below and
        // the end, return filter

        return filter
    }
}
```
3. New cats controller after changes

```ts
import {
    DatabaseFilterService,
    PaginatedModel,
} from 'nestjs-soft-pagination-filter-sort'

@Controller('cats')
export class CatsController
{
    constructor(
        @InjectModel(Cat) private catModel: typeof Cat,
        private readonly databaseFilterService: DatabaseFilterService<CatsGetAllDatabaseSequelizeFilter>,
    ) {}
    @UseInterceptors(PaginatedResponseInterceptor<YourModel, PaginatedModel<YourModel>>)
    @Get()
    getAll(@Query() paginatedRequestDTO: PaginatedRequestDTO)
    {
        const databaseToolFilter = new CatsGetAllDatabaseSequelizeFilter()
        const queryFilter = this.databaseFilterService.getQuery(databaseToolFilter, data.filter, 'Miu-Miu')
        return {
            total: await this.catModel.count({ where: queryFilter }),
            list: await this.catModel.findAll({ where: queryFilter }),
            offset: (paginatedRequestDTO.page && paginatedRequestDTO.size)
                && paginatedRequestDTO.page * paginatedRequestDTO.size + (paginatedRequestDTO.offset || 0),
            limit: paginatedRequestDTO.size,
            order: paginatedRequestDTO.sort && Object.entries(paginatedRequestDTO.sort),
        }
    }
}
```

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the examples.

See the contribution guide if you'd like to submit a PR.

## Help

If you don't understand something in the examples, you are experiencing problems, or you just need a gentle nudge in the right direction, please don't hesitate to contact us.

## License

**The MIT License (MIT)**

Copyright © 2023