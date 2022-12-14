import { Box, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";
import ColorContext from "../../store/color-context";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import Brightness7RoundedIcon from "@mui/icons-material/Brightness7Rounded";
import { makeStyledButton } from "../../api/makeStyledButton";
const StyledThemeButton = makeStyledButton([0], true);
export default function ThemeChanger() {
  const { themeMode, toggleColor } = useContext(ColorContext);
  const handleTheme = () => {
    toggleColor();
  };
  return (
    <React.Fragment>
      <StyledThemeButton disableRipple={true} onClick={handleTheme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {themeMode === "light" ? (
            <NightsStayIcon />
          ) : (
            <Brightness7RoundedIcon />
          )}
          <Typography variant="caption">Theme</Typography>
        </Box>
      </StyledThemeButton>
    </React.Fragment>
  );
}
