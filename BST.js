import { mergeSort } from "./merge-sort.js";

class Tree {
  constructor(array) {
    this.array = mergeSort(array);
    this.root = null;
  }

  static Node = class {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  };

  buildTree(array) {
    let midpoint = Math.floor(array.length / 2);
    let start = 0;
    let end = array.length - 1;

    if (array.length === 0) return null;

    let root = new Tree.Node(array[midpoint]);

    let leftOfMid = array.slice(start, midpoint);
    let rightOfMid = array.slice(midpoint + 1, end + 1);

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
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.array);
let root = tree.buildTree(tree.array);
console.log(root);
tree.prettyPrint(root);