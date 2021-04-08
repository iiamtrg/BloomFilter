export declare enum FilterType {
    TYPE_DEFAULT = "default",
    TYPE_COUNTING = "counting"
}
export declare abstract class Filter {
    private bitset;
    constructor();
    abstract add(key: string): boolean;
    abstract add(keys: string[]): boolean[];
    abstract contains(key: string): boolean;
    abstract contains(keys: string[]): boolean[];
    protected constructorBitset(size: number): void;
    protected has(index: number): boolean;
    protected increment(index: number): void;
    protected decrement(index: number): void;
}
