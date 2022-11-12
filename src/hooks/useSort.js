import { useContext, useState } from "react";
import useBubbleSort from "../algo/BubleSort";
import useSelectionSort from "../algo/SelectionSort";
import AlgoContext from "../store/algo-contect";
let resolvePromise;
export default function useSort() {
  const [start, setStart] = useState(false);
  //   const [colorState, setColorState] = useState({});
  const { bubbleSort, colorState: BubbColorState } = useBubbleSort();
  const {
    colorState: SelColorState,
    minIndex,
    minIndexGen: selectionSortGen,
  } = useSelectionSort();

  const { arr, setArr, algo, resume, isPaused } = useContext(AlgoContext);

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
    setStart(true);
    switch (algo) {
      case "Selection-Sort": {
        const genMinIndex = selectionSortGen(arr);
        await sortHelper(genMinIndex);
        setStart(false);
        break;
      }
      case "Bubble-Sort": {
        const genBubble = bubbleSort(arr);
        await sortHelper(genBubble);
        setStart(false);
        break;
      }
    }
  }

  return {
    handleVisual,
    arr,
    handlePromiseResolve,
    start,
    colorState: { BubbColorState, SelColorState },
    minIndex,
  };
}
