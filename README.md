# BloomFilter

The implement a Bloom Filter with optimizations for the number of hashes and size of array.

```
k=(m/n)× ln (2)
```
Where k is the optimal number of hashing functions, m is the size of the array, and n is the estimated number of elements.

```
m=-(n×ln (P))/(ln (2))²
```
Where m is the array size, n is the number of the estimated elements, and P is the false positive probability

```
P=(1-[1-(1/m)]ⁿᵏ)ᵏ 
```
Where P is the false Positive probability, m is the size of the array, n is the expected number of elements, and k is the number of hash functions used.

# Usage
``` javascript
    const filter = new FilterBuilder().BloomFilter().ExpectedElements(100).Hashses(10).HashFunction(new Murmur3()).Build();
    filter.add('foo')
    filter.contains('foo')  // true
    filter.contains('bar')  // false 
```
