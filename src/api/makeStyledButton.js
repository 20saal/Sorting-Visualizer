import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
export function makeStyledButton(spacing = [0, 0, 0, 0], boolean) {
  const StyledThemeButton = styled(IconButton)(({ theme }) => ({
    cursor: "pointer",
    padding: theme.spacing(...spacing),
    color: theme.palette.mode === "light" ? "black" : "white",
    transition: theme.transitions.create(["color", "transform"], {
      duration: theme.transitions.duration.standard,
    }),
    "&:hover": {
      ...(boolean
        ? { color: theme.palette.mode === "light" ? "#6b045a" : "yellow" }
        : {}),
      transform: "scale(1.25)",
    },
  }));
  return StyledThemeButton;
}
