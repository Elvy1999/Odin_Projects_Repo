class ListNode {
  constructor(data = null, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  //append an item to the end of the linked list.
  append(value) {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let iterator = this.head;
    while (iterator.next) {
      iterator = iterator.next;
    }
    iterator.next = newNode;
  }

  //adds a value to the front of the linked list
  prepend(value) {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;
  }

  //number of nodes in the linked list
  length() {
    let iterator = this.head;
    let count = iterator == null ? 0 : 1;
    while (iterator.next) {
      count++;
      iterator = iterator.next;
    }
    console.log(count);
    return count;
  }
  //returns the first value in the linked list
  getHead() {
    console.log(this.head);
    return this.head;
  }

  //returns the last node in the linked list
  getTail() {
    let iterator = this.head;
    while (iterator.next) {
      iterator = iterator.next;
    }
    console.log(iterator);
    return iterator;
  }
  //returns node at given index
  at(index) {
    let count = 0;
    let iterator = this.head;
    while (count != index) {
      if (iterator == null) {
        console.log("Index not in linked list");
        return;
      }
      iterator = iterator.next;
      count++;
    }
    console.log(iterator);
    return iterator;
  }

  //removes the last element from the list
  pop() {
    let iterator = this.head;
    if (iterator == null) {
      console.log("This linked list is empty");
      return;
    } else if (iterator.next == null) {
      console.log(this.head);
      this.head = null;
      return;
    }
    let next = this.head.next;
    while (next.next) {
      iterator = iterator.next;
      next = next.next;
    }
    iterator.next = null;
    console.log(next);
    return next;
  }
  // returns true if the passed in value is in the list and otherwise returns false.
  contains(value) {
    let iterator = this.head;
    while (iterator) {
      if (iterator.data == value) {
        console.log("true");
        return true;
      }
      iterator = iterator.next;
    }
    console.log("false");
    return false;
  }
  //returns the index of the node containing value, or null if not found.
  find(value) {
    let iterator = this.head;
    let counter = 0;
    while (iterator) {
      if (iterator.data == value) {
        console.log(counter);
        return counter;
      }
      iterator = iterator.next;
      counter++;
    }
    console.log("null");
    return null;
  }

  //represents your LinkedList objects as strings, so you can print them
  //out and preview them in the console.
  toString() {
    let iterator = this.head;
    const outputList = [];
    while (iterator) {
      outputList.push(`(${iterator.data}) ->`);
      iterator = iterator.next;
    }
    outputList.push("null");
    const output = outputList.join(" ");
    console.log(output);
  }

  // that inserts a new node with the provided value at the given index.
  insertAt(value, index) {
    const newNode = new ListNode(value);
    if (index == 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let counter = 1;
    let behind = this.head;
    let iterator = this.head.next;
    while (counter != index) {
      if (iterator == null) {
        throw new Error("Index not in range");
      }
      behind = behind.next;
      iterator = iterator.next;
      counter++;
    }
    behind.next = newNode;
    newNode.next = iterator;
  }

  //that removes the node at the given index.
  removeAt(index) {
    if (index == 0) {
      this.head = this.head.next;
      return;
    }
    let counter = 1;
    let behind = this.head;
    let iterator = this.head.next;
    while (counter != index) {
      if (iterator.next == null) {
        throw new Error("Index not in range");
      }
      behind = behind.next;
      iterator = iterator.next;
      counter++;
    }
    behind.next = iterator.next;
  }
}

let linkedList = new LinkedList();
console.log(linkedList);
linkedList.append(1);
linkedList.append(2);
linkedList.append(5);
console.log(linkedList);
linkedList.contains(100);
linkedList.getTail();
linkedList.append(100);
linkedList.contains(100);
linkedList.getTail();
console.log(linkedList);
linkedList.find(2);
linkedList.toString();
linkedList.prepend(0);
linkedList.toString();
linkedList.insertAt(3, 4);
linkedList.toString();
linkedList.insertAt(2000, 6);
linkedList.toString();
linkedList.removeAt(6);
linkedList.toString();
linkedList.removeAt(3);
linkedList.toString();
linkedList.removeAt(4);
linkedList.toString();
linkedList.removeAt(0);
linkedList.toString();
linkedList.insertAt(255, 1);
linkedList.toString();
linkedList.removeAt(4);
linkedList.toString();
