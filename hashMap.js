class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class hashMap {
  constructor() {
    //fix
  }

  hash(value) {
    let code = 0;
    const primeNumber = 31;

    for (let i = 0; i < value.length; i++) {
      code = primeNumber * code + value.charCodeAt(i);
    }
    return code;
  }
}

// % by 16 gives 0-15, & by 32 gives 0-31...
