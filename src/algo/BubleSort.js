import { useContext, useReducer, useState } from "react";
import { swap } from "../helpers/swap";
import AlgoContext from "../store/algo-contect";
const colorReducer = (prevState, action) => {
  switch (action.type) {
    case "START": {
      return {
        color: "#f7f76f",
        currindex: action.index,
      };
    }
    case "SWITCH": {
      return {
        color: "#fa87ad",
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
  return {
    color: "white",
    currindex: null,
  };
};
export default function useBubbleSort() {
  const { markStart, markFinished, isPaused, resume } = useContext(AlgoContext);
  const [colorState, dispatch] = useReducer(colorReducer, {
    color: "white",
    currindex: null,
  });
  async function* bubbleSort(arr) {
    markStart(); //algorithm starts
    let copiedArr = [...arr];
    for (let i = 0; i < copiedArr.length; i++) {
      let count = 0;
      for (let j = 0; j < copiedArr.length - 1; j++) {
        //when paused is clicked
        if (isPaused.current) {
          yield { copiedArr, paused: true };
        }
        dispatch({ type: "START", index: j });
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (+copiedArr[j] > +copiedArr[j + 1]) {
          count++;
          dispatch({ type: "SWITCH", index: j });
          await new Promise((resolve) => setTimeout(resolve, 200));
          //swap two elements
          swap(copiedArr, j, j + 1);
          yield { copiedArr, paused: false };
        }
      }
      //if array is sorted then break the loop
      if (count < 1) {
        dispatch({ type: "FINISHED" });
        markFinished();
        break;
      }
    }
    markFinished(); //algorithm is finished
  }
  return {
    bubbleSort,
    colorState,
  };
}
