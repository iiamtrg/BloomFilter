"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = exports.FilterType = void 0;
var FilterType;
(function (FilterType) {
    FilterType["TYPE_DEFAULT"] = "default";
    FilterType["TYPE_COUNTING"] = "counting";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var Filter = (function () {
    function Filter() {
    }
    Filter.prototype.constructorBitset = function (size) {
        this.bitset = new Array(size).fill(0);
    };
    Filter.prototype.has = function (index) {
        return this.bitset[index] > 0;
    };
    Filter.prototype.increment = function (index) {
        if (index > this.bitset.length) {
            throw new Error('runtime error: index out of range');
        }
        this.bitset[index] = this.bitset[index] + 1;
    };
    Filter.prototype.decrement = function (index) {
        if (index > this.bitset.length) {
            throw new Error('runtime error: index out of range');
        }
        this.bitset[index] = this.bitset[index] - 1;
    };
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map