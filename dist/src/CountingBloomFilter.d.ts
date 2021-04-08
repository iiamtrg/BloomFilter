import { Filter } from './Filter';
import { FilterBuilder } from './FilterBuilder';
export declare class CountingBloomFilter extends Filter {
    private config;
    private filter;
    constructor(config: FilterBuilder);
    add(key: string): boolean;
    add(keys: string[]): boolean[];
    contains(key: string): boolean;
    contains(keys: string[]): boolean[];
    remove(key: string): boolean;
}
