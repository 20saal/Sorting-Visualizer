import Box from "@mui/material/Box";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, Paper, Stack } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import useSelectionSort from "../../algo/SelectionSort";
import { VisualBoxStyle } from "../../helpers/constant";
import AlgoContext from "../../store/algo-contect";
import useBubbleSort from "../../algo/BubleSort";
import BoxElem from "./BoxElem";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
let resumePromise = () => {
  // console.log("doing nothing");
};
const VisualBox = () => {
  const [start, setStart] = useState(false);
  const { arr, setArr, algo, isFinished, pause, resume, isPaused } =
    useContext(AlgoContext);
  const unpaused = !isPaused.current;
  const { bubbleSort, colorState: BubbColorState } = useBubbleSort();
  const {
    colorState: SelColorState,
    minIndex,
    minIndexGen,
  } = useSelectionSort();

  const handleStart = () => {
    setStart(true);
    if (algo === "Selection-Sort") {
      const genMinIndex = minIndexGen(arr);
      (async () => {
        for await (let value of genMinIndex) {
          if (value.paused) {
            await new Promise((resolve) => {
              const timerId = setTimeout(resolve, [200000]);
              resumePromise = () => {
                resolve("resolved");
                clearTimeout(timerId);
                // console.log("resolving promise");
              };
            });
          }
          setArr([...value.copiedArr]);
        }
        setStart(false);
      })();
    } else if (algo === "Bubble-Sort") {
      const genBubble = bubbleSort(arr);
      (async () => {
        for await (let value of genBubble) {
          if (value.paused) {
            await new Promise((resolve) => {
              const timerId = setTimeout(resolve, [200000]);
              resumePromise = () => {
                resolve("resolved");
                clearTimeout(timerId);
                // console.log("resolving promise");
              };
            });
          }
          setArr([...value.copiedArr]);
        }
        setStart(false);
      })();
    }
  };
  const handlePause = () => {
    pause();
  };
  const handleResume = () => {
    resumePromise();
    resume();
    console.log("unPaused", unpaused);
  };

  return (
    <React.Fragment>
      <Zoom in={true}>
        <Paper sx={{ ...VisualBoxStyle }}>
          <Stack
            direction="row"
            sx={{
              height: "100%",
              px: 2,
              pt: 1,
              bgcolor: "inherit",
            }}
            alignItems="flex-end"
            justifyContent="space-around"
          >
            {arr.map((item, itemIndex) => (
              <BoxElem
                key={item}
                length={arr.length}
                item={item}
                itemIndex={itemIndex}
                minIndex={minIndex}
                SelColorState={SelColorState}
                BubbColorState={BubbColorState}
              >
                {item}
              </BoxElem>
            ))}
          </Stack>
        </Paper>
      </Zoom>
      <Box
        sx={{
          mt: 1.25,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-around",
          gap: { xs: 1, sm: 1.25 },
          width: "95%",
          marginX: "auto",
          my: 2,
        }}
      >
        <Button
          disabled={!start}
          variant="contained"
          startIcon={<PauseRoundedIcon />}
          onClick={handlePause}
          sx={{ flexGrow: { sm: 1 } }}
        >
          Pause
        </Button>
        <Button
          startIcon={<PlayCircleRoundedIcon />}
          disabled={!isFinished}
          variant="contained"
          onClick={handleStart}
          sx={{ flexGrow: { sm: 1 } }}
        >
          Start
        </Button>
        <Button
          disabled={!start}
          variant="contained"
          startIcon={<RestartAltRoundedIcon />}
          onClick={handleResume}
          sx={{ flexGrow: { sm: 1 } }}
        >
          Resume
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default VisualBox;
