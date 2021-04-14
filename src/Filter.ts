
export enum FilterType {
    TYPE_DEFAULT = 'default',
    TYPE_COUNTING = 'counting'
}

export interface IFilter {
    /**
     * @param key value to add
     * @returns {@code true} if the value did not previously exist in the filter. Note, that a false positive may occur,
     * thus the value may not have already been in the filter, but it hashed to a set of bits already in the filter.
     */
    add(key: string): boolean;

    /**
    * @param keys to add
    * @return a list of booleans indicating for each element, whether it was previously present in the filter
    */
    add(keys: string[]): boolean[];


    /**
    * @param key to test
    * @return {@code true} if the element is contained
    */
    contains(key: string): boolean;

    /**
     * @param keys a collection of elements to test
     * @return a list of booleans indicating for each element, whether it is present in the filter
     */
    contains(keys: string[]): boolean[];
}