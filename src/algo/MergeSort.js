import { useReducer } from "react";
const colorReducer = (prevState, action) => {};
export default function useMergeSort() {
  const [colorState, dispatch] = useReducer(colorReducer, { color: "white" });
  function* mergeSort(unSortedArray) {
    if (unSortedArray.length <= 1) {
      yield unSortedArray;
    }

    let divideTill = Math.floor(unSortedArray.length / 2);
    let leftArray = unSortedArray.slice(0, divideTill);
    let rightArray = unSortedArray.slice(divideTill);
    yield merge(
      mergeSort(leftArray).next().value,
      mergeSort(rightArray).next().value
    );
  }
  function merge(arr1, arr2) {
    let mergedArray = [];
    let i = 0;
    let j = 0;
    while (i < arr1.length || j < arr2.length) {
      if (i === arr1.length) {
        mergedArray.push(arr2[j]);
        j++;
      } else if (j === arr2.length) {
        mergedArray.push(arr1[i]);
        i++;
      }
      if (+arr1[i] < +arr2[j]) {
        mergedArray.push(arr1[i]);
        i++;
      } else if (+arr1[i] > +arr2[j]) {
        mergedArray.push(arr2[j]);
        j++;
      }
    }
    return mergedArray;
  }
  return {
    mergeSort,
  };
}
