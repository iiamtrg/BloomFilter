import { IFilter } from './Filter';
import { FilterBuilder } from './FilterBuilder';
import { IRemovable } from './IRemovable';
export declare class CountingBloomFilter implements IFilter, IRemovable<string> {
    private config;
    private filter;
    constructor(config: FilterBuilder);
    add(key: string): boolean;
    add(keys: string[]): boolean[];
    contains(key: string): boolean;
    contains(keys: string[]): boolean[];
    remove(key: string): boolean;
}
