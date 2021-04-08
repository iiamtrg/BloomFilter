import { Filter } from './Filter';
import { FilterBuilder } from './FilterBuilder';
export declare class BloomFilter extends Filter {
    private config;
    constructor(config: FilterBuilder);
    add(key: string): boolean;
    add(keys: string[]): boolean[];
    addRaw(key: string): boolean;
    contains(key: string): boolean;
    contains(keys: string[]): boolean[];
}
