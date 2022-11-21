import { useContext, useReducer } from "react";
import AlgoContext from "../store/algo-contect";
function colorReducer(prevState, action) {
  switch (action.type) {
    case "START": {
      return {
        currindex: action.index,
        unOrdIndex: action.index + 1,
      };
    }
    case "SWAP": {
      return {
        currindex: prevState.currindex - 1,
        unOrdIndex: prevState.unOrdIndex,
      };
    }
    case "FINISHED": {
      return {
        currindex: null,
        unOrdIndex: null,
      };
    }
  }
  return {
    color: "white",
    currindex: null,
    unOrdIndex: null,
  };
}
export default function useInsertionSort() {
  const { markStart, markFinished, isPaused } = useContext(AlgoContext);
  const [colorState, dispatch] = useReducer(colorReducer, {
    color: {
      currindex: null,
      unOrdIndex: null,
    },
  });

  async function* insertionSort(arr) {
    markStart();
    let copiedArr = [...arr];
    for (let i = 1; i < copiedArr.length; i++) {
      let elem = copiedArr[i];
      let j = i - 1;
      dispatch({ type: "START", index: i });
      await new Promise((resolve) => setTimeout(resolve, 500));
      while (j >= 0 && +elem < +copiedArr[j]) {
        if (isPaused.current) {
          yield { copiedArr, paused: true };
        }
        copiedArr[j + 1] = copiedArr[j];
        copiedArr[j] = elem;
        yield { copiedArr, paused: false };
        dispatch({ type: "SWAP" });
        await new Promise((resolve) => setTimeout(resolve, 200));
        j--;
      }
    }
    dispatch({ type: "FINISHED" });
    markFinished();
  }

  return {
    insertionSort,
    colorState,
  };
}
