import { mergeSort } from "./merge-sort.js";

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  static Node = class {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  };
}
