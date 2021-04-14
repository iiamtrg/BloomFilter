export declare enum FilterType {
    TYPE_DEFAULT = "default",
    TYPE_COUNTING = "counting"
}
export interface IFilter {
    add(key: string): boolean;
    add(keys: string[]): boolean[];
    contains(key: string): boolean;
    contains(keys: string[]): boolean[];
}
