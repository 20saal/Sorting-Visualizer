export async function swap(index1, index2, array) {
  [array[index1], array[index2]] = [array[index2], array[index1]];
}
