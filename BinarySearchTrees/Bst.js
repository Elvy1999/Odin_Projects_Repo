class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array = null) {
    this.array = array;
    this.root = null;
  }

  buildTree() {
    this.array = [...new Set(this.array)]; //remove duplicates from the array;
    this.array = this.array.sort((a, b) => a - b); // sort the array from smallest to largest value
    console.log(this.array);
    this.root = this.arrayToBST(this.array, 0, this.array.length - 1);
  }
  arrayToBST(array, start, end) {
    if (start > end) {
      return null;
    }

    let middle = Math.floor((start + end) / 2);
    let node = new Node(array[middle]);

    node.left = this.arrayToBST(array, start, middle - 1);
    node.right = this.arrayToBST(array, middle + 1, end);

    return node;
  }
  // insert a node in the balanced binary tree
  insert(value, root = this.root) {
    if (root == null) {
      root = new Node(value);
      return root;
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }
  //helper function for delete method
  highestNode(tNode) {
    let prev = tNode;
    while (tNode.right) {
      prev = tNode;
      tNode = tNode.right;
    }
    if (tNode.left) prev.right = tNode.left;
    else prev.right = null;
    return tNode;
  }

  // deletes a node with the specified value if it exist in the binary tree
  delete(value, tNode = this.root) {
    if (value == tNode.data) {
      if (tNode.left == null && tNode.right == null) {
        return null;
      }
      if (tNode.left != null && tNode.right != null) {
        const node = this.highestNode(tNode.left);
        node.right = tNode.right;
        node.left = tNode.left.data == node.data ? node.left : tNode.left;
        if (tNode == this.root) this.root = node;
        return node;
      }
      if (tNode.left != null) {
        return tNode.left;
      }
      if (tNode.right != null) {
        return tNode.right;
      }
    }
    if (value > tNode.data) {
      tNode.right = this.delete(value, tNode.right);
    } else if (value < tNode.data) {
      tNode.left = this.delete(value, tNode.left);
    }
    return tNode;
  }

  //Outputs the balanced binary tree
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  // refactoring this to an iterative approach would be more optimal, I believe, because of the length
  // of the retrace back to the original return if the value is very far nested in the tree.
  //accepts a value and returns the node with the given value
  find(value, iterator = this.root) {
    if (iterator == null) return false;
    else if (iterator.data == value) return iterator;

    if (value < iterator.data) {
      iterator = this.find(value, iterator.left);
      return iterator;
    } else if (value > iterator.data) {
      iterator = this.find(value, iterator.right);
      return iterator;
    }
  }

  // Traverse the tree in breadth-first level order and add the values from the nodes to an array
  levelOrder(iterator = this.root) {
    if (iterator == null) return;
    const array = [];
    const queue = [];
    while (iterator != undefined) {
      array.push(iterator.data);
      if (iterator.left) {
        queue.push(iterator.left);
      }
      if (iterator.right) {
        queue.push(iterator.right);
      }
      iterator = queue.shift();
    }
    return array;
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9]);
tree.buildTree();
tree.prettyPrint();
tree.insert(2);
tree.insert(1000);
tree.insert(-1);
// tree.insert(2000000);
// tree.insert(5000);
// tree.insert(300);
tree.prettyPrint();
console.log(tree.insert(6));

const tree2 = new Tree([1, 5, 10, 30, 50]);
tree2.buildTree();
tree2.insert(12);
tree2.insert(-5);
tree2.insert(6);
tree2.insert(14);
tree2.insert(13);
tree2.insert(-6);
tree2.insert(0);
tree2.insert(3);
tree2.insert(-3);
tree2.insert(-4);
tree2.insert(11);
tree2.prettyPrint();
console.log(tree2.find(11));
tree.prettyPrint();
console.log(tree.levelOrder());
const tree3 = new Tree([1]);
tree3.buildTree();
tree3.insert(1);
tree3.prettyPrint();
