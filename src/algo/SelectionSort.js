import { useContext, useReducer, useState } from "react";
import { swap } from "../helpers/swap";
import AlgoContext from "../store/algo-contect";

const colorReducer = (prevState, action) => {
  switch (action.type) {
    case "LOOP": {
      return {
        color: "#099e9e",
        currindex: action.index,
      };
    }
    case "CHECK&CHANGE": {
      return {
        color: "#d62445",
        currindex: action.index,
      };
    }
    case "FINISHED": {
      return {
        color: "white",
        currindex: null,
      };
    }
  }
};

export default function useSelectionSort() {
  const { markStart, markFinished, isPaused } = useContext(AlgoContext);
  const [colorState, dispatch] = useReducer(colorReducer, {
    color: "white",
    currindex: null,
  });
  const [minIndex, setMinIndex] = useState(null);
  async function* minIndexGen(arr) {
    markStart(); //algo-starts
    let copiedArr = [...arr];
    for (let i = 0; i < copiedArr.length; i++) {
      let minIndex = i;
      setMinIndex(i); //set starting elem as smallest
      for (let j = i + 1; j < copiedArr.length; j++) {
        if (isPaused.current) {
          yield { copiedArr, paused: true };
        }
        dispatch({ type: "LOOP", index: j }); //visualize looping for finding smallest elem
        await new Promise((resolve) => setTimeout(resolve, 200));
        if (+copiedArr[minIndex] > +copiedArr[j]) {
          minIndex = j;
          await new Promise((resolve) => setTimeout(resolve, 100));
          setMinIndex(minIndex); // //mark red color after finding other smallest elem
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
      swap(copiedArr, minIndex, i);
      yield { minIndex, copiedArr, paused: false };
    }
    // to make last component white we need to change both the color state and minIndex->null
    dispatch({ type: "FINISHED" });
    setMinIndex(null);
    markFinished(); //algo-finish
  }
  return {
    colorState,
    minIndex,
    minIndexGen,
  };
}
