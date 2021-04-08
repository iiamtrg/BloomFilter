import { Filter } from './Filter';
import { FilterBuilder } from './FilterBuilder';


export class BloomFilter extends Filter {

    private config: FilterBuilder;
    constructor(config: FilterBuilder) {
        super();
        this.config = config;
        this.config.complete();
        this.constructorBitset(this.config.Size());
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
            if (!this.has(pos)) {
                added = true;
                this.increment(pos);
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
                if (!this.has(pos)) {
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
                    if (!this.has(pos)) {
                        result.push(false);
                        return;
                    }
                })
                result.push(true);
            })
            return result;
        }
    }

}