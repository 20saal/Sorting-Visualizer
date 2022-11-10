export async function generateArray(length = 20) {
  const arr = [];
  let nonRepeatingArray;
  function factory() {
    for (let i = 0; i < length; i++) {
      const arrElem = Math.round(Math.random() * 25 + 1);
      arr.push(arrElem);
    }
    const outPut = new Set(arr);
    nonRepeatingArray = [...outPut];
    if (nonRepeatingArray.length === length) {
      return nonRepeatingArray;
    } else if (nonRepeatingArray.length < length) {
      // console.log("recaling");
      factory();
    }
    //if nonRepeaing array.length becomes greater
    const lengthDifference = nonRepeatingArray.length - length;
    if (lengthDifference > 0) {
      nonRepeatingArray.splice(0, lengthDifference);
      // console.log('slicing')
      // console.log(nonRepeatingArray)
    }
    return nonRepeatingArray;
  }
  localStorage.removeItem("generatedArray");
  return factory();
}
