import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { makeStyledButton } from "../../api/makeStyledButton";
import ReShuffle from "./ReShuffle";
import StopButton from "./StopButton";
const StyledThemeButton = makeStyledButton([0, 2, 0, 0], null);
export default function DrawerIcon() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerToggle = () => {
    setOpenDrawer((prev) => !prev);
  };
  return (
    <React.Fragment>
      <StyledThemeButton disableRipple={true} onClick={handleDrawerToggle}>
        <MenuRoundedIcon />
      </StyledThemeButton>
      <Drawer open={openDrawer} onClose={handleDrawerToggle}>
        <Toolbar>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontFamily: `'Lobster', cursive`,
              fontSize: { xs: 20, sm: 32 },
            }}
          >
            Visualizer
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem>
            <ReShuffle />
          </ListItem>
          <ListItem>
            <StopButton />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
