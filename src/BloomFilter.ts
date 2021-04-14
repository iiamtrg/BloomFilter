import { IFilter } from './Filter';
import { FilterBuilder } from './FilterBuilder';
import {Bitset} from "./Bitset";


export class BloomFilter implements IFilter {

    private config: FilterBuilder;
    private _bloom: Bitset;
    constructor(config: FilterBuilder) {
        this.config = config;
        this.config.complete();
        this._bloom = new Bitset(this.config.Size());
    }


    public add(key: string): boolean;

    public add(keys: string[]): boolean[];

    /**
     * @implements
     */
    public add(keys: string | string[]): boolean | boolean[] {

        if (!Array.isArray(keys)) {
            return this.addRaw(keys);
        } else {
            let result = [];
            keys.forEach(key => {
                result.push(this.addRaw(key));
            })
            return result;
        }
    }

     /**
     * @param key value to add
     * @returns {@code true} if the value did not previously exist in the filter. Note, that a false positive may occur,
     * thus the value may not have already been in the filter, but it hashed to a set of bits already in the filter.
     */
     public addRaw(key: string): boolean {
        const cfg = this.config;
        let added = false;

        const positions = cfg.HashFunction().hash(key, cfg.Size(), cfg.Hashses());
        positions.forEach(pos => {
            if (!this.getBit(pos)) {
                added = true;
                this.setBit(pos, true);
            }
        })
        return added;
    }
    

    public contains(key: string): boolean;

    public contains(keys: string[]): boolean[];

    /**
     * @implements
     */
    public contains(keys: string | string[]): boolean | boolean[] {
        const cfg = this.config;
        if (!Array.isArray(keys)) {
            const positions = cfg.HashFunction().hash(keys, cfg.Size(), cfg.Hashses());
            let result = true;
            positions.forEach(pos => {
                if (!this.getBit(pos)) {
                    result = false
                    return;
                }
            })
            return result;

        } else {
            let result: boolean[] = [];
            keys.forEach(key => {
                const positions = cfg.HashFunction().hash(key, cfg.Size(), cfg.Hashses());
                positions.forEach(pos => {
                    if (!this.getBit(pos)) {
                        result.push(false);
                        return;
                    }
                })
                result.push(true);
            })
            return result;
        }
    }

    public getBit(index: number): boolean {
        return this._bloom.get(index);
    }

    public setBit(index: number, value: boolean){
        this._bloom.set(index, value)
    }

}