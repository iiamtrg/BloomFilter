/// <reference types="node" />
import crypto from 'crypto';
declare enum HashMethod {
    Murmur2 = "Murmur2",
    Murmur3 = "Murmur3",
    MD5 = "MD5",
    SHA1 = "SHA1",
    SHA256 = "SHA256",
    SHA384 = "SHA384",
    SHA512 = "SHA512"
}
export declare class Murmur2 implements HashFunction {
    hash(value: string, m: number, k: number): number[];
}
export declare class Murmur3 implements HashFunction {
    hash(value: string, m: number, k: number): number[];
}
export declare class CryptoHash implements HashFunction {
    private method;
    constructor(method: HashMethod);
    getHasher(): crypto.Hash;
    hash(value: string, m: number, k: number): number[];
}
export interface HashFunction {
    hash(value: string, m: number, k: number): number[];
}
export {};
