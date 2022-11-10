import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useState } from "react";
import AlgoContext from "../../store/algo-contect";

function Algorithm(props) {
  const { isFinished, setSelectedAlgo } = useContext(AlgoContext);
  const [title, setTitle] = useState("Bubble-Sort");
  const algoArray = ["Bubble-Sort", "Selection-Sort"];
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAlgo = (event) => {
    setSelectedAlgo((prev) => event.target.innerText || prev); //clicking elswhere don't have any innerText
    setTitle((prev) => event.target.innerText || prev);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        size="small"
        disabled={!isFinished}
        variant="text"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleAlgo}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {algoArray.map((algo, index) => (
          <div key={algo}>
            {index !== 0 && <Divider />}
            <MenuItem onClick={handleAlgo}>{algo}</MenuItem>
          </div>
        ))}
      </Menu>
    </div>
  );
}

export default Algorithm;
