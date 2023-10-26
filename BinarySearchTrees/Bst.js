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
      if (tNode.left != null) return tNode.left;
      if (tNode.right != null) return tNode.right;
    }
    if (value > tNode.data) tNode.right = this.delete(value, tNode.right);
    else if (value < tNode.data) tNode.left = this.delete(value, tNode.left);
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

  // traverse the tree and output nodes in depth first order
  preorder(iterator = this.root, array = []) {
    if (iterator == null) return;
    array.push(iterator.data);
    this.preorder(iterator.left, array);
    this.preorder(iterator.right, array);
    return array;
  }
  // fun fact, this inserts all the elemnts in the array in order from least to greatest, the name of the methods give it away haha
  inorder(iterator = this.root, array = []) {
    if (iterator == null) return;
    this.inorder(iterator.left, array);
    array.push(iterator.data);
    this.inorder(iterator.right, array);
    return array;
  }

  postorder(iterator = this.root, array = []) {
    if (iterator == null) return;
    this.postorder(iterator.left, array);
    this.postorder(iterator.right, array);
    array.push(iterator.data);
    return array;
  }
  // returns the height of a given node
  height(iterator = this.root) {
    if (iterator == null) return -1;

    let leftHeight = this.height(iterator.left);
    let rightHeight = this.height(iterator.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  // accepts a node and returns its depth. Depth is defined as the number of edges
  //in path from a given node to the tree’s root node.
  depth(node) {
    // fix bug where the function does not end if the node does not exist in the tree
    let depth = 0;
    let iterator = this.root;
    while (iterator != node) {
      if (node.data < iterator.data) {
        iterator = iterator.left;
        depth++;
      } else if (node.data > iterator.data) {
        iterator = iterator.right;
        depth++;
      }
    }
    return depth;
  }

  //checks if the tree is balanced. A balanced tree is one where the difference between heights
  //of left subtree and right subtree of every node is not more than 1.
  isBalanced(node = this.root) {
    // I have to break this down later, I got this code from somebody else
    if (node === null) return true;
    const heightDiff = Math.abs(this.height(node.left) - this.height(node.right));
    return heightDiff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9]);
tree.buildTree();
tree.prettyPrint();
tree.insert(2);

tree.insert(-1);
tree.insert(3);
tree.insert(5);
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
console.log(tree.height());
console.log("depth", tree.depth(tree.find(8)));
tree.delete(6);
tree.delete(3);
tree.delete(5);
tree.insert(10);
tree.insert(100);
tree.insert(1000);
tree.delete(2);
tree.prettyPrint();
console.log(tree.isBalanced());
