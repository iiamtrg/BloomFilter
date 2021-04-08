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
exports.BloomFilter = void 0;
var Filter_1 = require("./Filter");
var BloomFilter = (function (_super) {
    __extends(BloomFilter, _super);
    function BloomFilter(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.config.complete();
        _this.constructorBitset(_this.config.Size());
        return _this;
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
            if (!_this.has(pos)) {
                added = true;
                _this.increment(pos);
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
                if (!_this.has(pos)) {
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
                    if (!_this.has(pos)) {
                        result_3.push(false);
                        return;
                    }
                });
                result_3.push(true);
            });
            return result_3;
        }
    };
    return BloomFilter;
}(Filter_1.Filter));
exports.BloomFilter = BloomFilter;
//# sourceMappingURL=BloomFilter.js.map