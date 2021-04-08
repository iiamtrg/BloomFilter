import { BloomFilter } from './BloomFilter';
import { Filter } from './Filter';
import { FilterBuilder } from './FilterBuilder';

export class CountingBloomFilter extends Filter {

    private config: FilterBuilder;
    private filter: BloomFilter;
    constructor(config: FilterBuilder) {
        super();
        config.complete();
        this.config = config;
        this.filter = new BloomFilter(config.clone());
    }
    
    public add(key: string): boolean;

    public add(keys: string[]): boolean[];
    /**
    * @implements
    */
    public add(keys: string | string[]): boolean | boolean[] {
        return this.filter.add(keys as any);
    }


    public contains(key: string): boolean;

    public contains(keys: string[]): boolean[];

    /**
    * @implements
    */
    public contains(keys: string | string[]): boolean | boolean[] {
        return this.filter.contains(keys as any);
    }

    /**
     *
     * @param key object to be deleted
     * @return {@code true} if the element is not present after removal
     */
    public remove(key: string): boolean {

        if (!this.contains(key)) return false;

        const cfg = this.config;
        const positions = cfg.HashFunction().hash(key, cfg.Size(), cfg.Hashses());

        positions.forEach(pos => {
            if (this.has(pos)) {
                this.decrement(pos);
            }
        })
        return true;
    }
}