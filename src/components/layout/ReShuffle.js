import React, { useContext } from "react";
import ShuffleOnRoundedIcon from "@mui/icons-material/ShuffleOnRounded";
import { Button } from "@mui/material";
import AlgoContext from "../../store/algo-contect";

export default function ReShuffle() {
  const { reset, isFinished } = useContext(AlgoContext);
  const handleReShuffle = () => {
    if (isFinished) {
      reset();
    }
  };
  return (
    <React.Fragment>
      <Button
        startIcon={<ShuffleOnRoundedIcon />}
        disabled={!isFinished}
        onClick={handleReShuffle}
        sx={{
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        }}
      >
        ReShuffle
      </Button>
    </React.Fragment>
  );
}
