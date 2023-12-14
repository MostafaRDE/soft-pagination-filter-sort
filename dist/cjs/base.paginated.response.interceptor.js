"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePaginatedResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let BasePaginatedResponseInterceptor = exports.BasePaginatedResponseInterceptor = class BasePaginatedResponseInterceptor {
    intercept(context, next) {
        const query = context.switchToHttp().getRequest().query;
        if (typeof query.page === 'string')
            query.page = Number.parseInt(`${query.page}`);
        if (typeof query.size === 'string')
            query.size = Number.parseInt(`${query.size}`);
        if (typeof query.offset === 'string')
            query.offset = Number.parseInt(`${query.offset}`);
        return next.handle().pipe((0, rxjs_1.map)((value) => this.buildResponse(value, query)));
    }
    buildResponse(value, request, moreData) {
        return {
            list: value.list,
            page: request.page,
            size: request.size,
            hasPrevPage: typeof request?.page === 'number' && request?.page > 1,
            hasNextPage: (typeof request?.page === 'number' && typeof request?.size === 'number')
                && request?.page * request?.size < value?.total,
            total: value.total,
            ...moreData,
        };
    }
};
exports.BasePaginatedResponseInterceptor = BasePaginatedResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], BasePaginatedResponseInterceptor);
