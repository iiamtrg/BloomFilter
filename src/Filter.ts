
export enum FilterType {
    TYPE_DEFAULT = 'default',
    TYPE_COUNTING = 'counting'

}

export abstract class Filter {

    private bitset: Array<number>;

    constructor() {
    }

    /**
     * @param key value to add
     * @returns {@code true} if the value did not previously exist in the filter. Note, that a false positive may occur,
     * thus the value may not have already been in the filter, but it hashed to a set of bits already in the filter.
     */
    abstract add(key: string): boolean;

    /**
    * @param keys to add
    * @return a list of booleans indicating for each element, whether it was previously present in the filter
    */
    abstract add(keys: string[]): boolean[];

    /**
    * @param key to test
    * @return {@code true} if the element is contained
    */
    abstract contains(key: string): boolean;

    /**
     * @param keys a collection of elements to test
     * @return a list of booleans indicating for each element, whether it is present in the filter
     */
    abstract contains(keys: string[]): boolean[];

    /**
   * @param size of bitset
   */
    protected constructorBitset(size: number): void {
        this.bitset = new Array(size).fill(0);
    }

    protected has(index: number): boolean {
        return this.bitset[index] > 0;
    }

    protected increment(index: number): void {
        if (index > this.bitset.length) {
            throw new Error('runtime error: index out of range');
        }

        this.bitset[index] = this.bitset[index] + 1;

    }

    protected decrement(index: number): void {
        if (index > this.bitset.length) {
            throw new Error('runtime error: index out of range');
        }
        this.bitset[index] = this.bitset[index] - 1;
    }

}