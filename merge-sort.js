export function mergeSort(array) {
  if (array === null) return null;
  if (array.length === 0 || array.length === 1) return array;
  else {
    const midpoint = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, midpoint);
    const rightHalf = array.slice(midpoint, array.length);

    const leftHalfSorted = mergeSort(leftHalf);
    const rightHalfSorted = mergeSort(rightHalf);

    function mergeArrays(arr1, arr2) {
      const newArray = [];

      while (!(arr1.length === 0 && arr2.length === 0)) {
        if (arr1[0] < arr2[0] || arr1[0] === arr2[0] || arr2[0] === undefined) {
          newArray.push(arr1.shift());
        } else if (arr1[0] > arr2[0] || arr1[0] === undefined) {
          newArray.push(arr2.shift());
        }
      }

      return newArray;
    }

    const sortedArray = mergeArrays(leftHalfSorted, rightHalfSorted);

    // remove dupes

    return sortedArray.filter(
      (number, index) => number !== sortedArray[index + 1]
    );
  }
}
