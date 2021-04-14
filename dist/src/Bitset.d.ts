export declare class Bitset {
    private _set;
    constructor(size?: number);
    get(index: number): boolean;
    set(index: number, value: boolean): void;
    private increment;
    private decrement;
}
