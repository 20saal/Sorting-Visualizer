import CancelIcon from "@mui/icons-material/Cancel";
import { Button, IconButton } from "@mui/material";
import React from "react";
export default function StopButton() {
  return (
    <React.Fragment>
      <Button
        disableRipple={true}
        // onClick={genrateArrayHandler}
      >
        Stop
      </Button>
    </React.Fragment>
  );
}
