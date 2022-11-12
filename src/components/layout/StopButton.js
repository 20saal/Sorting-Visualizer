import CancelIcon from "@mui/icons-material/Cancel";
import { Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import AlgoContext from "../../store/algo-contect";
export default function StopButton() {
  const { markFinished, reset, resume, isFinished } = useContext(AlgoContext);
  const stopHandler = () => {
    localStorage.removeItem("generatedArray");
    markFinished();
    reset();
    resume();
  };
  return (
    <React.Fragment>
      <Button
        disabled={isFinished}
        startIcon={<CancelIcon />}
        onClick={stopHandler}
        sx={{
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        }}
      >
        Stop
      </Button>
    </React.Fragment>
  );
}
