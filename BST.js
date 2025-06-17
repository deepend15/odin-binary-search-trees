import { mergeSort } from "./merge-sort.js";

class Tree {
  constructor(array = null) {
    this.array = mergeSort(array);
    this.root = this.buildTree(this.array);
  }

  static Node = class {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  };

  buildTree(array) {
    if (array === null || array.length === 0) return null;

    let midpoint = Math.floor(array.length / 2);

    let root = new Tree.Node(array[midpoint]);

    let leftOfMid = array.slice(0, midpoint);
    let rightOfMid = array.slice(midpoint + 1, array.length);

    root.left = this.buildTree(leftOfMid);
    root.right = this.buildTree(rightOfMid);

    return root;
  }

  prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(value) {
    if (this.root === null) {
      this.root = this.buildTree([value]);
      return;
    }

    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.data) return;

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          const newNode = new Tree.Node(value);
          currentNode.left = newNode;
          return;
        } else currentNode = currentNode.left;
      }

      if (value > currentNode.data) {
        if (currentNode.right === null) {
          const newNode = new Tree.Node(value);
          currentNode.right = newNode;
          return;
        } else currentNode = currentNode.right;
      }
    }
  }

  delete(value) {
    if (this.root === null) return;

    function numberOfChildren(node) {
      if (node.left === null && node.right === null) return 0;
      if (node.left !== null && node.right !== null) return 2;
      else return 1;
    }

    function findNewRoot(node) {
      if (numberOfChildren(node) === 0) return null;

      if (numberOfChildren(node) === 1) {
        if (node.left === null) return node.right;
        else return node.left;
      }
    }

    function findSuccessorNodeValue(node) {
      let successorNode = node.right;
      while (successorNode.left !== null) {
        successorNode = successorNode.left;
      }
      return successorNode.data;
    }

    if (this.root.data === value) {
      if (numberOfChildren(this.root) !== 2) {
        this.root = findNewRoot(this.root);
        return;
      } else {
        let successorNodeValue = findSuccessorNodeValue(this.root);
        this.delete(successorNodeValue);
        this.root.data = successorNodeValue;
        return;
      }
    }

    let currentNode = this.root;

    while (currentNode) {
      if (value < currentNode.data) {
        if (currentNode.left === null) return;
        else {
          if (currentNode.left.data === value) {
            if (numberOfChildren(currentNode.left) !== 2) {
              currentNode.left = findNewRoot(currentNode.left);
              return;
            } else {
              let successorNodeValue = findSuccessorNodeValue(currentNode.left);
              this.delete(successorNodeValue);
              currentNode.left.data = successorNodeValue;
              return;
            }
          } else currentNode = currentNode.left;
        }
      }

      if (value > currentNode.data) {
        if (currentNode.right === null) return;
        else {
          if (currentNode.right.data === value) {
            if (numberOfChildren(currentNode.right) !== 2) {
              currentNode.right = findNewRoot(currentNode.right);
              return;
            } else {
              let successorNodeValue = findSuccessorNodeValue(currentNode.right);
              this.delete(successorNodeValue);
              currentNode.right.data = successorNodeValue;
              return;
            }
          } else currentNode = currentNode.right;
        }
      }
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(6);
tree.prettyPrint(tree.root);
tree.delete(8);
tree.delete(5);
tree.prettyPrint(tree.root);
