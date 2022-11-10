import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShuffleOnRoundedIcon from "@mui/icons-material/ShuffleOnRounded";
import AlgoContext from "../../store/algo-contect";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import { IconBtn } from "../../api/IconButton";
import { generateArray } from "../../helpers/generateArr";
import Algorithm from "./Algorithm";
const Layout = (props) => {
  const { reset, isFinished, setArr } = useContext(AlgoContext);
  const handleReShuffle = () => {
    if (isFinished) {
      reset();
    }
  };
  const genrateArrayHandler = async () => {
    const genArray = await generateArray();
    setArr(genArray);
    localStorage.setItem("generatedArray", [genArray]);
  };
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar sx={{ bgcolor: "white", color: "black" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: `'Lobster', cursive`,
              fontSize: { xs: 20, sm: 30 },
              // display: { xs: "none", sm: "block" },
            }}
          >
            Visualizer
          </Typography>
          <Box flexGrow={1} textAlign="center">
            <Algorithm />
          </Box>
          <Stack
            sx={{ mx: 1 }}
            direction="row"
            spacing={{ xs: 0.75, sm: 1, md: 2 }}
            alignItems="center"
          >
            <IconBtn
              disabled={!isFinished}
              disableRipple={true}
              onClick={handleReShuffle}
              sx={{ p: 0 }}
            >
              <ShuffleOnRoundedIcon />
            </IconBtn>

            <IconBtn
              disabled={!isFinished}
              size="large"
              disableRipple={true}
              onClick={genrateArrayHandler}
              sx={{ p: 0 }}
            >
              <FactoryRoundedIcon />
            </IconBtn>
          </Stack>
        </Toolbar>
      </AppBar>
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
