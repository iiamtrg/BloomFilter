"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitset = void 0;
var Bitset = (function () {
    function Bitset(size) {
        this._set = new Array(size || 100).fill(0);
    }
    Bitset.prototype.get = function (index) {
        if (index > this._set.length) {
            throw new Error('runtime error: index out of range');
        }
        return this._set[index] > 0;
    };
    Bitset.prototype.set = function (index, value) {
        if (value) {
            this.increment(index);
        }
        else {
            this.decrement(index);
        }
    };
    Bitset.prototype.increment = function (index) {
        if (index > this._set.length) {
            throw new Error('runtime error: index out of range');
        }
        this._set[index] = this._set[index] + 1;
    };
    Bitset.prototype.decrement = function (index) {
        if (index > this._set.length) {
            throw new Error('runtime error: index out of range');
        }
        this._set[index] = this._set[index] - 1;
    };
    return Bitset;
}());
exports.Bitset = Bitset;
//# sourceMappingURL=Bitset.js.map