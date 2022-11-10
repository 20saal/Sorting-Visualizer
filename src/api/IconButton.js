import styled from "@emotion/styled";
import { IconButton, makeStyles } from "@mui/material";

export const IconBtn = styled(IconButton)(({ theme }) => ({
  color: "#157575",
  "&:hover": {
    color: "#094d4d",
  },
}));
