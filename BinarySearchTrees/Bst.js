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
    if (tNode.right == null) {
      return tNode;
    }
    const highestNode = this.highestNode(tNode.right); //28
    tNode.right = highestNode.left;
    return highestNode;
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
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.buildTree();
tree.prettyPrint();
tree.insert(2);
tree.insert(2000000);
tree.insert(5000);
tree.insert(300);
tree.prettyPrint();
console.log(tree.insert(6));

const tree2 = new Tree([1, 5, 10, 30, 50]);
tree2.buildTree();
tree2.insert(12);
tree2.insert(20);
tree2.insert(15);
tree2.insert(-5);
tree2.insert(6);
tree2.insert(14);
tree2.insert(13);
tree2.prettyPrint();
tree2.delete(20);
tree2.delete(30);
tree2.delete(10);
tree2.delete(6);
tree2.delete(-5);
tree2.delete(1);
tree2.delete(15);
tree2.prettyPrint();
