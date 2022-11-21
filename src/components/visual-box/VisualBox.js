import Box from "@mui/material/Box";
import React, { useContext } from "react";
import { Button, Divider, Paper, Stack } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { VisualBoxStyle } from "../../helpers/constant";
import AlgoContext from "../../store/algo-contect";
import BoxElem from "./BoxElem";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import useSort from "../../hooks/useSort";
const VisualBox = () => {
  const { isFinished, pause, isPaused } = useContext(AlgoContext);
  const unpaused = !isPaused.current;
  const { arr, handleVisual, handlePromiseResolve, colorState, minIndex } =
    useSort();

  const handleStart = async () => {
    await handleVisual();
  };
  const handlePause = () => {
    pause();
  };
  const handleResume = () => {
    handlePromiseResolve();
  };

  return (
    <React.Fragment>
      <Zoom in={true}>
        <Paper
          sx={{
            ...VisualBoxStyle,
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#057a85" : "#6b045a",
          }}
        >
          <Stack
            direction="row"
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
                colorState={colorState}
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
          flexDirection: { sm: "row" },
          justifyContent: "space-around",
          gap: { xs: 1, sm: 3 },
          width: "95%",
          marginX: "auto",
          my: 2,
        }}
      >
        <Button
          disabled={isFinished}
          variant="contained"
          startIcon={<PauseRoundedIcon />}
          onClick={handlePause}
          sx={{ flexGrow: { sm: 1 } }}
        >
          Pause
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          startIcon={<PlayCircleRoundedIcon />}
          disabled={!isFinished}
          variant="contained"
          onClick={handleStart}
          sx={{ flexGrow: { sm: 1 } }}
        >
          Start
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          disabled={isFinished && unpaused}
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
