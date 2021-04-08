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
        this.flasePositiveP = 0.1;
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
    FilterBuilder.prototype.FalsePositiveProbability = function (flasePositiveP) {
        this.flasePositiveP = flasePositiveP;
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
        if (this.size === 0 && this.expectedElements !== 0 && this.flasePositiveP !== 0) {
            this.size = this.optimalM(this.expectedElements, this.flasePositiveP);
        }
        if (this.hashes === 0 && this.expectedElements !== 0 && this.size !== 0) {
            this.hashes = this.optimalK(this.expectedElements, this.size);
        }
        if (this.size === 0 || this.hashes === 0) {
            throw new Error('Neither (expectedElements, falsePositiveProbability) nor (size, hashes) were specified.s');
        }
    };
    FilterBuilder.prototype.Build = function () {
        this.complete();
        return this.build();
    };
    FilterBuilder.prototype.build = function () {
        switch (this.tp) {
            case Filter_1.FilterType.TYPE_DEFAULT:
                return new BloomFilter_1.BloomFilter(this);
            case Filter_1.FilterType.TYPE_COUNTING:
                return new CountingBloomFilter_1.CountingBloomFilter(this);
            default:
                throw new Error("Unknow type " + this.tp);
        }
    };
    return FilterBuilder;
}());
exports.FilterBuilder = FilterBuilder;
//# sourceMappingURL=FilterBuilder.js.map