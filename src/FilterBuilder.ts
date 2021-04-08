import { BloomFilter } from './BloomFilter';
import { CountingBloomFilter } from './CountingBloomFilter';
import { Filter, FilterType } from './Filter';
import { HashFunction, Murmur3 } from './HashProvider'

export class FilterBuilder {
    private tp: FilterType;
    private expectedElements: number = 0;
    private size: number = 0;
    private hashes: number = 0;
    private flasePositiveP: number = 0.1;
    private hashFunction = new Murmur3();

    constructor() {
    }

    /**
     * @return the modified FilterBuilder (fluent interface)
     */
    public BloomFilter(): FilterBuilder {
        this.tp = FilterType.TYPE_DEFAULT;
        return this;
    }

    /**
     * @return the modified FilterBuilder (fluent interface)
     */
    public CountingBloomFilter(): FilterBuilder {
        this.tp = FilterType.TYPE_COUNTING;
        return this;
    }

    /**
     * @param expectedElements number of expected elements.
     * @return the modified FilterBuilder (fluent interface)
     */
    public ExpectedElements(expectedElements: number): FilterBuilder {
        this.expectedElements = expectedElements;
        return this
    }

    /**
     * @param falsePositiveProbability the tolerable false
     * @return the modified FilterBuilder (fluent interface)
     */
    public FalsePositiveProbability(flasePositiveP: number): FilterBuilder {
        this.flasePositiveP = flasePositiveP;
        return this;
    }

    /**
      * @param size the size of the bloom filter in bits.
      * @return the modified FilterBuilder (fluent interface)
      */
    public Size(size: number): FilterBuilder;

    /**
     * @return size of the bloom filter in bits.
     */
    public Size(): number;

    public Size(size?: number): FilterBuilder | number {
        if (size === null) {
            throw new Error('The function accepts only numeric or zero arguments')
        }
        if (size) {
            this.size = size;
            return this;
        }
        return this.size;
    }

    /**
     * @param numberOfHashes number of hash functions used by the filter.
     * @return the modified FilterBuilder (fluent interface)
     */
    public Hashses(numberOfHashes: number): FilterBuilder;

    /**
     * @reutnr number of hash functions used by the filter.
     */
    public Hashses(): number;

    public Hashses(numberOfHashes?: number): FilterBuilder | number {
        if (numberOfHashes === null) {
            throw new Error('The function accepts only numeric or zero arguments')
        }

        if (numberOfHashes) {
            this.hashes = numberOfHashes;
            return this;
        }
        return this.hashes;
    }

    /**
     *  @param hashFunction the method used to generate hash values
     *  @return the modified FilterBuilder (fluent interface)
     */
    public HashFunction(hashFunction: HashFunction): FilterBuilder;

    /**
     * name
     */
    public HashFunction(): HashFunction;

    public HashFunction(hashFunction?: HashFunction): FilterBuilder | HashFunction {
        if (hashFunction) {
            this.hashFunction = hashFunction;
            return this;
        }
        return this.hashFunction;
    }

    /**
     * @param n Expected number of elements inserted in the bloom filter
     * @param p Tolerable false positive rate
     * @return the optimal size <i>size</i> of the bloom filter in bits
     */
    public optimalM(n: number, p: number): number {
        return Math.ceil(-1 * (n * Math.log(p)) / Math.pow(Math.log(2), 2));
    }

    /**
     * @param n Expected number of elements inserted in the bloom filter
     * @param m The size of the bloom filter in bits.
     * @return the optimal size <i>size</i> of the bloom filter in bits
     */
    public optimalK(n: number, m: number): number {
        return Math.ceil((Math.log(2) * m) / n);
    }

    /**
     * @return an object cloned from FilterBuilder
     */
    public clone(): FilterBuilder {
        return (Object.assign(Object.create(FilterBuilder.prototype), this) as FilterBuilder);
    }

    
    /**
     * @return the completed FilterBuilder
     */
    public complete() {
        if (this.size === 0 && this.expectedElements !== 0 && this.flasePositiveP !== 0) {
            this.size = this.optimalM(this.expectedElements, this.flasePositiveP);
        }

        if (this.hashes === 0 && this.expectedElements !== 0 && this.size !== 0) {
            this.hashes = this.optimalK(this.expectedElements, this.size);
        }

        if (this.size === 0 || this.hashes === 0) {
            throw new Error('Neither (expectedElements, falsePositiveProbability) nor (size, hashes) were specified.s');
        }
    }

    /**
     * @returns the constructed Filter
     */
    public Build(): Filter {
        this.complete();
        return this.build();
    }



    private build(): Filter {
        switch (this.tp) {
            case FilterType.TYPE_DEFAULT:
                return new BloomFilter(this);
            case FilterType.TYPE_COUNTING:
                return new CountingBloomFilter(this);
            default:
                throw new Error(`Unknow type ${this.tp}`);
        }
    }



}