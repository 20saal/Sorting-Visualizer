export async function swap(arr, minIndex, otherIndex) {
  [arr[otherIndex], arr[minIndex]] = [arr[minIndex], arr[otherIndex]];
}
