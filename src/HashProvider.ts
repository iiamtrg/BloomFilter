import crypto from 'crypto';
import murmurhash from 'murmurhash-js';


enum HashMethod {
    Murmur2 = 'Murmur2',
    Murmur3 = 'Murmur3',
    MD5 = 'MD5',
    SHA1 = 'SHA1',
    SHA256 = 'SHA256',
    SHA384 = 'SHA384',
    SHA512 = 'SHA512'
}

export class Murmur2 implements HashFunction {

    /**
     * @param value the value to be hashed
     * @param m integer output range [1,size]
     * @param k number of hashes to be computed
     */
    public hash(value: string, m: number, k: number): number[] {
        let result = new Array<number>(k);
        const hash1 = murmurhash.murmur2(value, 0);
        const hash2 = murmurhash.murmur2(value, hash1);
        for (let i = 0; i < k; i++) {
            const position = (hash1 + i * hash2) % m;
            result.push(position);
        }
        return result;
    }
}

export class Murmur3 implements HashFunction {

    /**
     * @param value the value to be hashed
     * @param m integer output range [1,size]
     * @param k number of hashes to be computed
     */
    public hash(value: string, m: number, k: number): number[] {
        let result = new Array<number>(k);
        const hash1 = murmurhash.murmur3(value, 0);
        const hash2 = murmurhash.murmur3(value, hash1);

        for (let i = 0; i < k; i++) {
            const position = (hash1 + i * hash2) % m;

            result.push(position);
        }
        return result;
    }
}



export class CryptoHash implements HashFunction {

    private method: HashMethod;

    constructor(method: HashMethod){
        this.method = method;
    }

    public getHasher(): crypto.Hash {
        return crypto.createHash(this.method);
    }

    /**
     * @param value the value to be hashed
     * @param m integer output range [1,size]
     * @param k number of hashes to be computed
     */
    public hash(value: string, m: number, k: number): number[] {

        let result = new Array<number>(k);

        let cryptoHash = this.getHasher();
        let computedHashes = 0;
        const r = Math.random()
        while(computedHashes < k) {
            cryptoHash = cryptoHash.update(value);
            const digest = cryptoHash.digest();

            const intHash = digest.readUInt32BE(4);

            result.push(intHash);
            computedHashes ++;
        }
        return result;
    }

}


export interface HashFunction {

    /**
    * Computes hash values.
    *
    * @param value the byte[] representation of the element to be hashed
    * @param m     integer output range [1,size]
    * @param k     number of hashes to be computed
    * @return int array of hashes hash values
    */
    hash(value: string, m: number, k: number): number[];
}