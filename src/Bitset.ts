
export class Bitset {
    private _set: Array<number>;

    constructor(size? :number) {
        this._set = new Array(size || 100).fill(0);
    }

    public get(index: number): boolean {
        if (index > this._set.length) {
            throw new Error('runtime error: index out of range');
        }
        return this._set[index] > 0;
    }

    public set(index: number, value: boolean): void {
        if (value) {
            this.increment(index);
        } else {
            this.decrement(index);
        }
    }

    private increment(index: number): void {
        if (index > this._set.length) {
            throw new Error('runtime error: index out of range');
        }
        this._set[index] = this._set[index] + 1;
    }

    private decrement(index: number): void {
        if (index > this._set.length) {
            throw new Error('runtime error: index out of range');
        }
        this._set[index] = this._set[index] - 1;
    }

}