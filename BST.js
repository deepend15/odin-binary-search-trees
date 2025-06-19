import { mergeSort } from "./merge-sort.js";
import { numberOfChildren } from "./number-of-children.js";

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

    const midpoint = Math.floor(array.length / 2);

    const root = new Tree.Node(array[midpoint]);

    const leftOfMid = array.slice(0, midpoint);
    const rightOfMid = array.slice(midpoint + 1, array.length);

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
        const successorNodeValue = findSuccessorNodeValue(this.root);
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
              const successorNodeValue = findSuccessorNodeValue(
                currentNode.left
              );
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
              const successorNodeValue = findSuccessorNodeValue(
                currentNode.right
              );
              this.delete(successorNodeValue);
              currentNode.right.data = successorNodeValue;
              return;
            }
          } else currentNode = currentNode.right;
        }
      }
    }
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) break;
      if (value < currentNode.data) currentNode = currentNode.left;
      else currentNode = currentNode.right;
    }

    return currentNode;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error(
        "This function requires a callback function as its parameter."
      );
    }

    if (this.root === null) return;

    const queue = [];

    queue.push(this.root);

    while (queue.length !== 0) {
      const firstInQueue = queue[0];
      callback(firstInQueue);
      if (firstInQueue.left !== null) queue.push(firstInQueue.left);
      if (firstInQueue.right !== null) queue.push(firstInQueue.right);
      queue.shift();
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error(
        "This function requires a callback function as its parameter."
      );
    }

    function runCallback(root) {
      if (root === null) return;
      runCallback(root.left);
      callback(root);
      runCallback(root.right);
    }

    runCallback(this.root);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error(
        "This function requires a callback function as its parameter."
      );
    }

    function runCallback(root) {
      if (root === null) return;
      callback(root);
      runCallback(root.left);
      runCallback(root.right);
    }

    runCallback(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error(
        "This function requires a callback function as its parameter."
      );
    }

    function runCallback(root) {
      if (root === null) return;
      runCallback(root.left);
      runCallback(root.right);
      callback(root);
    }

    runCallback(this.root);
  }

  height(value) {
    const node = this.find(value);

    if (node === null) return null;

    function findDistanceToLeaf(node, counter = 0) {
      if (numberOfChildren(node) === 0) {
        return counter;
      } else if (numberOfChildren(node) === 1) {
        counter += 1;
        if (node.left === null) {
          return findDistanceToLeaf(node.right, counter);
        } else return findDistanceToLeaf(node.left, counter);
      } else {
        counter += 1;
        if (
          findDistanceToLeaf(node.right, counter) >=
          findDistanceToLeaf(node.left, counter)
        ) {
          return findDistanceToLeaf(node.right, counter);
        } else {
          return findDistanceToLeaf(node.left, counter);
        }
      }
    }

    return findDistanceToLeaf(node);
  }

  depth(value) {
    let counter = 0;
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) break;
      counter += 1;
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else currentNode = currentNode.right;
    }

    if (currentNode === null) return null;
    else return counter;
  }

  isBalanced() {
    function checkIfBalanced(node) {
      if (numberOfChildren(node) === 0) return true;
      else if (numberOfChildren(node) === 1) {
        if (tree.height(node.data) === 1) return true;
        else return false;
      } else {
        const leftValue = node.left.data;
        const rightValue = node.right.data;
        if (
          -1 <= tree.height(leftValue) - tree.height(rightValue) <= 1 &&
          checkIfBalanced(node.left) &&
          checkIfBalanced(node.right)
        ) {
          return true;
        } else return false;
      }
    }

    return checkIfBalanced(this.root);
  }

  rebalance() {
    const newOrderedArray = [];

    function addValueToArray(node) {
      newOrderedArray.push(node.data);
    }

    tree.inOrder(addValueToArray);

    const newRoot = tree.buildTree(newOrderedArray);

    this.root = newRoot;
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.prettyPrint(tree.root);

// function printDataValue(node) {
//   console.log(node.data);
// }

// tree.levelOrder(printDataValue);
// tree.inOrder(printDataValue);
// tree.preOrder(printDataValue);
// tree.postOrder(printDataValue);
