import { FilterBuilder } from '../src/FilterBuilder';
import { Murmur3 } from '../src/HashProvider';
import { assert, expect } from 'chai';

describe('BloomFilter::normal-test', () => {
  it('using add with one key', async () => {
    const filter = new FilterBuilder().BloomFilter().ExpectedElements(100).Hashses(10).HashFunction(new Murmur3()).Build();
    filter.add('foo')
    filter.add('truong')
    filter.add('vcce')
    assert.isTrue(filter.contains('foo'))
    assert.isTrue(filter.contains('truong'))
    assert.isTrue(filter.contains('vcce'))
    assert.isTrue(!filter.contains('555555'))
    assert.isTrue(!filter.contains('3123'))
    assert.isTrue(!filter.contains('213123'))
    assert.isTrue(!filter.contains('asdasdv'))
  });

  it('using add with multi key', async () => {
    const filter = new FilterBuilder().BloomFilter().ExpectedElements(100).Hashses(10).HashFunction(new Murmur3()).Build();
    filter.add(['foo', 'truong', 'vcce'])
    assert.isTrue(filter.contains('foo'))
    assert.isTrue(filter.contains('truong'))
    assert.isTrue(filter.contains('vcce'))
    assert.isTrue(!filter.contains('555555'))
    assert.isTrue(!filter.contains('3123'))
    assert.isTrue(!filter.contains('213123'))
    assert.isTrue(!filter.contains('asdasdv'))
  });
});


describe('CountingBloomFilter::normal-test', () => {
  it('using add with one key', async () => {
    const filter = new FilterBuilder().CountingBloomFilter().ExpectedElements(100).Hashses(10).HashFunction(new Murmur3()).Build();
    filter.add('foo')
    filter.add('truong')
    filter.add('vcce')
    assert.isTrue(filter.contains('foo'))
    assert.isTrue(filter.contains('truong'))
    assert.isTrue(filter.contains('vcce'))
    assert.isTrue(!filter.contains('555555'))
    assert.isTrue(!filter.contains('3123'))
    assert.isTrue(!filter.contains('213123'))
    assert.isTrue(!filter.contains('asdasdv'))
  });

  it('using add with multi key', async () => {
    const filter = new FilterBuilder().BloomFilter().ExpectedElements(100).Hashses(10).HashFunction(new Murmur3()).Build();
    filter.add(['foo', 'truong', 'vcce'])
    assert.isTrue(filter.contains('foo'))
    assert.isTrue(filter.contains('truong'))
    assert.isTrue(filter.contains('vcce'))
    assert.isTrue(!filter.contains('555555'))
    assert.isTrue(!filter.contains('3123'))
    assert.isTrue(!filter.contains('213123'))
    assert.isTrue(!filter.contains('asdasdv'))
  });

  it('Throw error if size == null', async () => {
    let error;
    try {
      const filter = new FilterBuilder().BloomFilter().Size(null).ExpectedElements(100).Hashses(10).HashFunction(new Murmur3()).Build();
    } catch (err){
      error = err;
      expect(error).to.exist.and.be.instanceOf(Error)
    }
  })

  it('Throw error if size == 0', async () => {
    let error;
    try {
      const filter = new FilterBuilder().BloomFilter().Size(0).ExpectedElements(100).Hashses(10).HashFunction(new Murmur3()).Build();
    } catch (err){
      error = err;
      expect(error).to.exist.and.be.instanceOf(Error)
    }
  })
  it('Throw error if hashes == 0', async () => {
    let error;
    try {
      const filter = new FilterBuilder().BloomFilter().Size(0).ExpectedElements(100).Hashses(10).HashFunction(new Murmur3()).Build();
    } catch (err){
      error = err;
      expect(error).to.exist.and.be.instanceOf(Error)
    }

  })
});
