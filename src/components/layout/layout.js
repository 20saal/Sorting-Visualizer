import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { Stack, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import AlgoContext from "../../store/algo-contect";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import { generateArray } from "../../helpers/generateArr";
import Algorithm from "./Algorithm";
import ThemeChanger from "./ThemeChanger";
import DrawerIcon from "./Drawer";
import { makeStyledButton } from "../../api/makeStyledButton";
import { grey } from "@mui/material/colors";

const StyledThemeButton = makeStyledButton([0], true);
const Layout = (props) => {
  const { isFinished, setArr } = useContext(AlgoContext);
  const genrateArrayHandler = async () => {
    const genArray = await generateArray();
    setArr(genArray);
    localStorage.setItem("generatedArray", [genArray]);
  };
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar
          sx={{
            bgcolor: (theme) => {
              return theme.palette.mode === "light" ? grey[50] : grey[800];
            },
            color: (theme) => {
              return theme.palette.mode === "light" ? grey[900] : grey[50];
            },
          }}
        >
          <DrawerIcon />

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: `'Lobster', cursive`,
              fontSize: { xs: 24, sm: 40 },
            }}
          >
            Vi
          </Typography>
          <Box flexGrow={1} textAlign="center">
            <Algorithm />
          </Box>
          <Stack
            sx={{ mx: 1 }}
            direction="row"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            alignItems="center"
          >
            <ThemeChanger />

            <StyledThemeButton
              disabled={!isFinished}
              disableRipple={true}
              onClick={genrateArrayHandler}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <FactoryRoundedIcon />
                <Typography variant="caption" component="p">
                  Generate
                </Typography>
              </Box>
            </StyledThemeButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
