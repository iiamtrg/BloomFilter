"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloomFilter = void 0;
var Bitset_1 = require("./Bitset");
var BloomFilter = (function () {
    function BloomFilter(config) {
        this.config = config;
        this.config.complete();
        this._bloom = new Bitset_1.Bitset(this.config.Size());
    }
    BloomFilter.prototype.add = function (keys) {
        var _this = this;
        if (!Array.isArray(keys)) {
            return this.addRaw(keys);
        }
        else {
            var result_1 = [];
            keys.forEach(function (key) {
                result_1.push(_this.addRaw(key));
            });
            return result_1;
        }
    };
    BloomFilter.prototype.addRaw = function (key) {
        var _this = this;
        var cfg = this.config;
        var added = false;
        var positions = cfg.HashFunction().hash(key, cfg.Size(), cfg.Hashses());
        positions.forEach(function (pos) {
            if (!_this.getBit(pos)) {
                added = true;
                _this.setBit(pos, true);
            }
        });
        return added;
    };
    BloomFilter.prototype.contains = function (keys) {
        var _this = this;
        var cfg = this.config;
        if (!Array.isArray(keys)) {
            var positions = cfg.HashFunction().hash(keys, cfg.Size(), cfg.Hashses());
            var result_2 = true;
            positions.forEach(function (pos) {
                if (!_this.getBit(pos)) {
                    result_2 = false;
                    return;
                }
            });
            return result_2;
        }
        else {
            var result_3 = [];
            keys.forEach(function (key) {
                var positions = cfg.HashFunction().hash(key, cfg.Size(), cfg.Hashses());
                positions.forEach(function (pos) {
                    if (!_this.getBit(pos)) {
                        result_3.push(false);
                        return;
                    }
                });
                result_3.push(true);
            });
            return result_3;
        }
    };
    BloomFilter.prototype.getBit = function (index) {
        return this._bloom.get(index);
    };
    BloomFilter.prototype.setBit = function (index, value) {
        this._bloom.set(index, value);
    };
    return BloomFilter;
}());
exports.BloomFilter = BloomFilter;
//# sourceMappingURL=BloomFilter.js.map