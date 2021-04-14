"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBuilder = void 0;
var BloomFilter_1 = require("./BloomFilter");
var CountingBloomFilter_1 = require("./CountingBloomFilter");
var Filter_1 = require("./Filter");
var HashProvider_1 = require("./HashProvider");
var FilterBuilder = (function () {
    function FilterBuilder() {
        this.expectedElements = 0;
        this.size = 0;
        this.hashes = 0;
        this.falsePositiveP = 0.1;
        this.hashFunction = new HashProvider_1.Murmur3();
    }
    FilterBuilder.prototype.BloomFilter = function () {
        this.tp = Filter_1.FilterType.TYPE_DEFAULT;
        return this;
    };
    FilterBuilder.prototype.CountingBloomFilter = function () {
        this.tp = Filter_1.FilterType.TYPE_COUNTING;
        return this;
    };
    FilterBuilder.prototype.ExpectedElements = function (expectedElements) {
        this.expectedElements = expectedElements;
        return this;
    };
    FilterBuilder.prototype.FalsePositiveProbability = function (falsePositiveP) {
        this.falsePositiveP = falsePositiveP;
        return this;
    };
    FilterBuilder.prototype.Size = function (size) {
        if (size === null) {
            throw new Error('The function accepts only numeric or zero arguments');
        }
        if (size) {
            this.size = size;
            return this;
        }
        return this.size;
    };
    FilterBuilder.prototype.Hashses = function (numberOfHashes) {
        if (numberOfHashes === null) {
            throw new Error('The function accepts only numeric or zero arguments');
        }
        if (numberOfHashes) {
            this.hashes = numberOfHashes;
            return this;
        }
        return this.hashes;
    };
    FilterBuilder.prototype.HashFunction = function (hashFunction) {
        if (hashFunction) {
            this.hashFunction = hashFunction;
            return this;
        }
        return this.hashFunction;
    };
    FilterBuilder.prototype.optimalM = function (n, p) {
        return Math.ceil(-1 * (n * Math.log(p)) / Math.pow(Math.log(2), 2));
    };
    FilterBuilder.prototype.optimalK = function (n, m) {
        return Math.ceil((Math.log(2) * m) / n);
    };
    FilterBuilder.prototype.clone = function () {
        return Object.assign(Object.create(FilterBuilder.prototype), this);
    };
    FilterBuilder.prototype.complete = function () {
        if (this.size === 0 && this.expectedElements !== 0 && this.falsePositiveP !== 0) {
            this.size = this.optimalM(this.expectedElements, this.falsePositiveP);
        }
        if (this.hashes === 0 && this.expectedElements !== 0 && this.size !== 0) {
            this.hashes = this.optimalK(this.expectedElements, this.size);
        }
        if (this.size === 0 || this.hashes === 0) {
            throw new Error('Neither (expectedElements, falsePositiveProbability) nor (size, hashes) were specified.s');
        }
    };
    FilterBuilder.prototype.buildBloomFilter = function () {
        this.complete();
        return new BloomFilter_1.BloomFilter(this);
    };
    FilterBuilder.prototype.buildCountingBloomFilter = function () {
        this.complete();
        return new CountingBloomFilter_1.CountingBloomFilter(this);
    };
    return FilterBuilder;
}());
exports.FilterBuilder = FilterBuilder;
//# sourceMappingURL=FilterBuilder.js.map