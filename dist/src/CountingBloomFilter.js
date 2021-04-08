"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountingBloomFilter = void 0;
var BloomFilter_1 = require("./BloomFilter");
var Filter_1 = require("./Filter");
var CountingBloomFilter = (function (_super) {
    __extends(CountingBloomFilter, _super);
    function CountingBloomFilter(config) {
        var _this = _super.call(this) || this;
        config.complete();
        _this.config = config;
        _this.filter = new BloomFilter_1.BloomFilter(config.clone());
        return _this;
    }
    CountingBloomFilter.prototype.add = function (keys) {
        return this.filter.add(keys);
    };
    CountingBloomFilter.prototype.contains = function (keys) {
        return this.filter.contains(keys);
    };
    CountingBloomFilter.prototype.remove = function (key) {
        var _this = this;
        if (!this.contains(key))
            return false;
        var cfg = this.config;
        var positions = cfg.HashFunction().hash(key, cfg.Size(), cfg.Hashses());
        positions.forEach(function (pos) {
            if (_this.has(pos)) {
                _this.decrement(pos);
            }
        });
        return true;
    };
    return CountingBloomFilter;
}(Filter_1.Filter));
exports.CountingBloomFilter = CountingBloomFilter;
//# sourceMappingURL=CountingBloomFilter.js.map