import { Tree } from "./BST.js";

function generateRandomArray(n) {
  const array = [];

  let counter = 0;

  while (counter < n) {
    const randomNumber = Math.floor(Math.random() * 100);
    array.push(randomNumber);
    counter += 1;
  }

  return array;
}

let randomArray = generateRandomArray(15);
console.log("Array of 15 random integers less than 100: ", randomArray);

const tree = new Tree(randomArray);
console.log(
  "Create balanced binary search tree (BST) of random array (note: there may be less nodes in the tree than values in the random array if the array contained duplicate values)."
);
tree.prettyPrint(tree.root);

console.log("Tree balanced? ", tree.isBalanced());

let string = "";
function createValueString(node) {
  if (string.length === 0) string = string.concat(node.data.toString());
  else string = string.concat(", ", node.data.toString());
}
tree.levelOrder(createValueString);
console.log("All BST values in level order: ", string);

string = "";
tree.preOrder(createValueString);
console.log("All BST values in pre-order: ", string);

string = "";
tree.postOrder(createValueString);
console.log("All BST values in post-order: ", string);

string = "";
tree.inOrder(createValueString);
console.log("All BST values in in-order: ", string);

tree.insert(125);
tree.insert(237);
tree.insert(683);
console.log(
  "Unbalance the tree by adding in three values over 100 (125, 237, and 683)."
);
tree.prettyPrint(tree.root);
console.log("Tree balanced? ", tree.isBalanced());

tree.rebalance();
console.log("Rebalance the tree.");
tree.prettyPrint(tree.root);
console.log("Tree balanced? ", tree.isBalanced());

string = "";
tree.levelOrder(createValueString);
console.log("All BST values in level order: ", string);

string = "";
tree.preOrder(createValueString);
console.log("All BST values in pre-order: ", string);

string = "";
tree.postOrder(createValueString);
console.log("All BST values in post-order: ", string);

string = "";
tree.inOrder(createValueString);
console.log("All BST values in in-order: ", string);
