"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountingBloomFilter = void 0;
var BloomFilter_1 = require("./BloomFilter");
var CountingBloomFilter = (function () {
    function CountingBloomFilter(config) {
        config.complete();
        this.config = config;
        this.filter = new BloomFilter_1.BloomFilter(config.clone());
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
            if (_this.filter.getBit(pos)) {
                _this.filter.setBit(pos, false);
            }
        });
        return true;
    };
    return CountingBloomFilter;
}());
exports.CountingBloomFilter = CountingBloomFilter;
//# sourceMappingURL=CountingBloomFilter.js.map