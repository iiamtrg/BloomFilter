import { BloomFilter } from './BloomFilter';
import { CountingBloomFilter } from './CountingBloomFilter';
import { HashFunction } from './HashProvider';
export declare class FilterBuilder {
    private tp;
    private expectedElements;
    private size;
    private hashes;
    private falsePositiveP;
    private hashFunction;
    constructor();
    BloomFilter(): FilterBuilder;
    CountingBloomFilter(): FilterBuilder;
    ExpectedElements(expectedElements: number): FilterBuilder;
    FalsePositiveProbability(falsePositiveP: number): FilterBuilder;
    Size(size: number): FilterBuilder;
    Size(): number;
    Hashses(numberOfHashes: number): FilterBuilder;
    Hashses(): number;
    HashFunction(hashFunction: HashFunction): FilterBuilder;
    HashFunction(): HashFunction;
    optimalM(n: number, p: number): number;
    optimalK(n: number, m: number): number;
    clone(): FilterBuilder;
    complete(): void;
    buildBloomFilter(): BloomFilter;
    buildCountingBloomFilter(): CountingBloomFilter;
}
