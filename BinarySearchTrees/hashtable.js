class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size);
  }

  //Utilizes a simple hashing algorithim to return the index for where the key,value item will
  // be stored in the array
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.size;
    }
    return hash;
  }

  //insert a value into the hash table
  set(key, value) {
    let index = this._hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
      this.table[index].push([key, value]);
    } else {
      this.table[index].push([key, value]);
    }
  }
  // get the key and value from the hashtable
  get(key) {
    let index = this._hash(key);
    if (this.table[index]) {
      for (let list of this.table[index]) {
        if (list[0] == key) {
          return `${key} -> ${list[1]}`;
        }
      }
    }
    return undefined;
  }

  // delete a value from the hashtable
  delete(key) {
    const index = this._hash(key);
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] == key) {
          this.table[index].splice(i, 1);
        }
      }
    }
    return "Item Not Found";
  }
}

const hashtable = new HashTable(5);
console.log(hashtable);
hashtable.set("Elvy", 100);
hashtable.set("Jamey", 99);
hashtable.set("Mark", 70);
hashtable.set("Maria", 50);

console.log(hashtable);
hashtable.delete("");
console.log(hashtable);
console.log(hashtable.get("Elvy"));
console.log(hashtable.get("Jamey"));
