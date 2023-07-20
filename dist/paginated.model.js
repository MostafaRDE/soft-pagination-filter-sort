"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedModel = void 0;
class PaginatedModel {
    constructor(options) {
        this.total = options.total;
        this.list = options.list;
    }
}
exports.PaginatedModel = PaginatedModel;
