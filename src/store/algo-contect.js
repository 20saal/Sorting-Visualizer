import React, { useRef, useState } from "react";

const AlgoContext = React.createContext({
  algo: "Algorithams",
  arr: [],
  isFinished: true,
  markFinished: () => {},
  markStart: () => {},
  isPaused: false,
  pause: () => {},
  resume: () => {},
});

export const AlgoContextProvider = (props) => {
  const storedArr = localStorage.getItem("generatedArray")?.split(","); //localstorage store the item as a string , split(',') -> array['elems']
  const initialArr = storedArr || [
    17, 7, 3, 1, 2, 10, 14, 12, 9, 8, 6, 5, 11, 20, 13, 19, 16, 15, 18,
  ];
  const [arr, setArr] = useState(initialArr);
  const [isFinished, setIsFinished] = useState(true);
  const [algo, setAlgo] = useState("Algorithams");
  const isPaused = useRef(false); //The returned mutable object will persist for the full lifetime of the component.
  const pause = () => {
    isPaused.current = true;
  };
  const resume = () => {
    isPaused.current = false;
  };
  const markStart = () => {
    setIsFinished(false);
  };
  const markFinished = () => {
    setIsFinished(true);
  };
  const reset = () => {
    setArr(initialArr);
    setIsFinished(true);
  };

  const setSelectedAlgo = (selectedAlgo) => {
    setAlgo(selectedAlgo);
  };

  const cntxValue = {
    algo,
    arr,
    isFinished,
    markFinished,
    markStart,
    setArr,
    reset,
    setSelectedAlgo,
    isPaused,
    pause,
    resume,
  };
  return (
    <AlgoContext.Provider value={cntxValue}>
      {props.children}
    </AlgoContext.Provider>
  );
};

export default AlgoContext;
