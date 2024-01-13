class hashMap {
  constructor(bucketSize) {
    //Create buckets and them as null
    this.buckets = Array(bucketSize).fill(null);
  }

  outofIndex(index) {
    //Prevent js from accessing out of index size
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  hash(value) {
    //Hash coding function
    let code = 0;
    const primeNumber = 31;

    for (let i = 0; i < value.length; i++) {
      code = primeNumber * code + value.charCodeAt(i);
    }
    return code;
  }

  resize() {
    const loadFactor = this.length / this.buckets.length;

    //If buckets hit 0.75 or more full double the size of buckets and rehash the values
    if (loadFactor >= 0.75) {
      const newSize = this.buckets.length * 2;
      const newBuckets = new Array(newSize);

      for (const bucketContent of this.buckets) {
        if (bucketContent) {
          for (const [key, value] of Object.entries(bucketContent)) {
            const newBucket = this.hash(key) % newSize;
            newBuckets[newBucket] = {
              ...newBuckets[newBucket],
              [key]: value,
            };
          }
        }
      }
      this.buckets = newBuckets;
    }
  }

  set(key, value) {
    //Grab and hash the key create a valid bucket for the key
    const bucket = this.hash(key) % this.buckets.length;
    this.outofIndex(bucket);

    //If the key already exists, update the key with new value
    if (this.buckets[bucket] && key in this.buckets[bucket]) {
      this.buckets[bucket][key] = value;
    } else {
      // If key is new store it and check if buckets need resizing
      this.buckets[bucket] = { ...this.buckets[bucket], [key]: value };
      this.resize();
    }
  }

  get(key) {
    const bucket = this.hash(key) % this.buckets.length;
    this.outofIndex(bucket);

    const bucketContent = this.buckets[bucket];

    //Get the key and return the key if exist if not return null
    if (bucketContent && key in bucketContent) {
      return bucketContent[key];
    } else {
      return null;
    }
  }

  has(key) {
    const bucket = this.hash(key) % this.buckets.length;
    this.outofIndex(bucket);
    //Get the key and return true if key exists, if not return false
    if (this.buckets[bucket] && key in this.buckets[bucket]) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    const bucket = this.hash(key) % this.buckets.length;
    this.outofIndex(bucket);
    //Find and delete the key
    if (this.buckets[bucket] && key in this.buckets[bucket]) {
      delete this.buckets[bucket][key];

      //Leaves the traces of removed keys
      if (Object.keys(this.buckets[bucket]).length === 0) {
        this.buckets[bucket] = null;
      }
    } else {
      //If the key doesnt exist throw an error
      throw new Error("Key not found!");
    }
  }

  length() {
    let length = 0;
    for (const bucketContent of this.buckets) {
      if (bucketContent) {
        length += 1;
      }
    }
    return length;
  }

  clear() {
    //Replace all the buckets with new null buckets
    this.buckets = Array(this.buckets.length).fill(null);
  }

  keys() {
    const keys = [];

    for (const bucketContent of this.buckets) {
      if (bucketContent) {
        //Pushes all the keys, including collisions
        for (const [key, value] of Object.entries(bucketContent)) {
          keys.push(key);
        }
      }
    }

    return keys;
  }

  values() {
    const values = [];

    for (const bucketContent of this.buckets) {
      if (bucketContent) {
        //Pushes all the values, including collisions
        for (const [key, value] of Object.entries(bucketContent)) {
          values.push(value);
        }
      }
    }

    return values;
  }

  entries() {
    const entries = [];

    for (const bucketContent of this.buckets) {
      if (bucketContent) {
        //Pushes all the key value pairs, including collisions
        for (const [key, value] of Object.entries(bucketContent)) {
          let entry = [key, value];
          entries.push(entry);
        }
      }
    }

    return entries;
  }
}

const test = new hashMap(16);
test.set("halil", 9);
test.set("sena", 4);

console.log(test.get("halil")); //  9
console.log(test.get("sena")); //  4

test.set("halil", 94); // Update with 94

console.log(test.get("halil")); // 94

console.log(test.has("halil")); //true
console.log(test.has("hazar")); //false
console.log(test.has("sena")); //true

test.set("hazar", 31);
console.log(test.has("hazar")); //true
test.remove("hazar");
console.log(test.has("hazar")); //false

/*
  test.remove("notintable"); Throws error
*/

console.log(test.length()); // 2
test.clear();
console.log(test.length()); // 0

//New sets after clear

test.set("halil", 9);
test.set("sena", 4);
test.set("hazar", 7);

console.log(test.keys()); // ['hazar', 'sena', 'halil']
console.log(test.values()); // [7, 4, 9]

const entries = test.entries(); // Entries test needs a for loop to show properly in debug console
for (let i = 0; i < entries.length; i++) {
  console.log(entries[i]);
}

/*
see the whole hashMap

for (let i = 0; i < test.buckets.length; i++) {
  // not using () on length since its a method of the class
  console.log(test.buckets[i]);
}
*/
