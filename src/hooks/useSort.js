import { useContext } from "react";
import useBubbleSort from "../algo/BubleSort";
import useInsertionSort from "../algo/InsertionSort";
import useMergeSort from "../algo/MergeSort";
import useSelectionSort from "../algo/SelectionSort";
import AlgoContext from "../store/algo-contect";
let resolvePromise = () => {};
export default function useSort() {
  //   const [colorState, setColorState] = useState({});
  const { bubbleSort, colorState: BubbColorState } = useBubbleSort();
  const {
    colorState: SelColorState,
    minIndex,
    minIndexGen: selectionSortGen,
  } = useSelectionSort();
  const { mergeSort } = useMergeSort();

  const { arr, setArr, algo, resume, isPaused } = useContext(AlgoContext);
  const { insertionSort, colorState: InsertionColorState } = useInsertionSort();

  async function sortHelper(generator) {
    for await (let value of generator) {
      if (value.paused) {
        await new Promise((resolve) => {
          const timerId = setTimeout(resolve, [200000]);
          //on resume call resolvePromise function and resolve the promise and clear the timerId
          resolvePromise = () => {
            resolve("resolved");
            clearTimeout(timerId);
          };
          clearTimeout(timerId);
        });
      }
      setArr([...value.copiedArr]);
    }
  }
  const handlePromiseResolve = () => {
    if (isPaused.current) {
      resolvePromise();
      resume();
    }
  };
  async function handleVisual() {
    switch (algo) {
      case "Selection-Sort": {
        const genMinIndex = selectionSortGen(arr);
        await sortHelper(genMinIndex);
        break;
      }
      case "Bubble-Sort": {
        const genBubble = bubbleSort(arr);
        await sortHelper(genBubble);
        break;
      }
      case "Insertion-Sort": {
        const inserGen = insertionSort(arr);
        await sortHelper(inserGen);
        break;
      }
    }
  }

  return {
    handleVisual,
    arr,
    handlePromiseResolve,
    colorState: { BubbColorState, SelColorState, InsertionColorState },
    minIndex,
  };
}
