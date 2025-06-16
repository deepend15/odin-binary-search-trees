export function mergeSort(array) {
  if (array.length === 0 || array.length === 1) return array;
  else {
    let midpoint = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midpoint);
    let rightHalf = array.slice(midpoint, array.length);

    let leftHalfSorted = mergeSort(leftHalf);
    let rightHalfSorted = mergeSort(rightHalf);

    function mergeArrays(arr1, arr2) {
      let newArray = [];

      while (!(arr1.length === 0 && arr2.length === 0)) {
        if (arr1[0] < arr2[0] || arr1[0] === arr2[0] || arr2[0] === undefined) {
          newArray.push(arr1.shift());
        } else if (arr1[0] > arr2[0] || arr1[0] === undefined) {
          newArray.push(arr2.shift());
        }
      }

      return newArray;
    }

    let sortedArray = mergeArrays(leftHalfSorted, rightHalfSorted);

    //remove dupes

    return sortedArray.filter(
      (number, index) => number !== sortedArray[index + 1]
    );
  }
}
