import { IFilter } from './Filter';
import { FilterBuilder } from './FilterBuilder';
export declare class BloomFilter implements IFilter {
    private config;
    private _bloom;
    constructor(config: FilterBuilder);
    add(key: string): boolean;
    add(keys: string[]): boolean[];
    addRaw(key: string): boolean;
    contains(key: string): boolean;
    contains(keys: string[]): boolean[];
    getBit(index: number): boolean;
    setBit(index: number, value: boolean): void;
}
