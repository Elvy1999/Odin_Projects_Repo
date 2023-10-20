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
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.buildTree();
tree.prettyPrint();
tree.insert(2);
tree.insert(2000000);
tree.insert(5000);
tree.prettyPrint();
