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
    if (this.array === null) {
      this.array = [value];
      this.root = this.buildTree(this.array);
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
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.root);
tree.insert(6);
tree.prettyPrint(tree.root);
