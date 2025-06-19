export function numberOfChildren(node) {
  if (node.left === null && node.right === null) return 0;
  if (node.left !== null && node.right !== null) return 2;
  else return 1;
}
