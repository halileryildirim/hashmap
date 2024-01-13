class hashSet {
  constructor(bucketSize) {
    this.buckets = Array(bucketSize)
      .fill(null)
      .map(() => []); //Initialize as empty arrays since it only contains keys, retrieving removing and locating will be easier
  }

  outofIndex(index) {
    // Prevent accessing out-of-bounds index
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  hash(value) {
    // Hashing function
    let code = 0;
    const primeNumber = 31;

    for (let i = 0; i < value.length; i++) {
      code = primeNumber * code + value.charCodeAt(i);
    }
    return code;
  }

  resize() {
    const loadFactor = this.length / this.buckets.length;

    // If load factor is 0.75 or more, double the size of buckets and rehash the values
    if (loadFactor >= 0.75) {
      const newSize = this.buckets.length * 2;
      const newBuckets = Array(newSize)
        .fill(null)
        .map(() => []);

      for (const bucketContent of this.buckets) {
        for (const key of bucketContent) {
          const newBucket = this.hash(key) % newSize;
          newBuckets[newBucket].push(key);
        }
      }
      this.buckets = newBuckets;
    }
  }

  add(key) {
    // Grab and hash the key, create a valid bucket for the key
    const bucket = this.hash(key) % this.buckets.length;
    this.outofIndex(bucket);

    // If the key is not already in the set, add it and check if buckets need resizing
    if (!this.buckets[bucket].includes(key)) {
      this.buckets[bucket].push(key);
      this.resize();
    }
  }

  has(key) {
    const bucket = this.hash(key) % this.buckets.length;
    this.outofIndex(bucket);
    // Check if the key is in the set
    return this.buckets[bucket].includes(key);
  }

  remove(key) {
    const bucket = this.hash(key) % this.buckets.length;
    this.outofIndex(bucket);

    // Remove the key from the set
    const index = this.buckets[bucket].indexOf(key);
    if (index !== -1) {
      this.buckets[bucket].splice(index, 1);
    }
  }

  length() {
    let length = 0;
    for (const bucketContent of this.buckets) {
      length += bucketContent.length;
    }
    return length;
  }

  clear() {
    // Replace all the buckets with new empty arrays
    this.buckets = Array(this.buckets.length)
      .fill(null)
      .map(() => []);
  }

  keys() {
    const keys = [];
    for (const bucketContent of this.buckets) {
      keys.push(...bucketContent);
    }
    return keys;
  }
}

const testSet = new hashSet(4);

// Test add function
testSet.add("halil");
testSet.add("sena");
testSet.add("hazar");
console.log(testSet.keys()); // ['sena', 'halil', 'hazar']

// Test has function
console.log(testSet.has("halil")); //true
console.log(testSet.has("ahmet")); //false

// Test remove function
testSet.remove("sena");
console.log(testSet.keys()); // ['halil', 'hazar']

// Test length function
console.log(testSet.length()); // 2

// Test clear function
testSet.clear();
console.log(testSet.keys()); // []
