"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHash = exports.Murmur3 = exports.Murmur2 = void 0;
var crypto_1 = __importDefault(require("crypto"));
var murmurhash_js_1 = __importDefault(require("murmurhash-js"));
var HashMethod;
(function (HashMethod) {
    HashMethod["Murmur2"] = "Murmur2";
    HashMethod["Murmur3"] = "Murmur3";
    HashMethod["MD5"] = "MD5";
    HashMethod["SHA1"] = "SHA1";
    HashMethod["SHA256"] = "SHA256";
    HashMethod["SHA384"] = "SHA384";
    HashMethod["SHA512"] = "SHA512";
})(HashMethod || (HashMethod = {}));
var Murmur2 = (function () {
    function Murmur2() {
    }
    Murmur2.prototype.hash = function (value, m, k) {
        var result = new Array(k);
        var hash1 = murmurhash_js_1.default.murmur2(value, 0);
        var hash2 = murmurhash_js_1.default.murmur2(value, hash1);
        for (var i = 0; i < k; i++) {
            var position = (hash1 + i * hash2) % m;
            result.push(position);
        }
        return result;
    };
    return Murmur2;
}());
exports.Murmur2 = Murmur2;
var Murmur3 = (function () {
    function Murmur3() {
    }
    Murmur3.prototype.hash = function (value, m, k) {
        var result = new Array(k);
        var hash1 = murmurhash_js_1.default.murmur3(value, 0);
        var hash2 = murmurhash_js_1.default.murmur3(value, hash1);
        for (var i = 0; i < k; i++) {
            var position = (hash1 + i * hash2) % m;
            result.push(position);
        }
        return result;
    };
    return Murmur3;
}());
exports.Murmur3 = Murmur3;
var CryptoHash = (function () {
    function CryptoHash(method) {
        this.method = method;
    }
    CryptoHash.prototype.getHasher = function () {
        return crypto_1.default.createHash(this.method);
    };
    CryptoHash.prototype.hash = function (value, m, k) {
        var result = new Array(k);
        var cryptoHash = this.getHasher();
        var computedHashes = 0;
        var r = Math.random();
        while (computedHashes < k) {
            cryptoHash = cryptoHash.update(value);
            var digest = cryptoHash.digest();
            var intHash = digest.readUInt32BE(4);
            result.push(intHash);
            computedHashes++;
        }
        return result;
    };
    return CryptoHash;
}());
exports.CryptoHash = CryptoHash;
//# sourceMappingURL=HashProvider.js.map