import "./App.css";
import VisualBox from "./components/visual-box/VisualBox";
import { useContext, useEffect, useMemo, useState } from "react";
import Layout from "./components/layout/layout";
import { AlgoContextProvider } from "./store/algo-contect";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ColorContext from "./store/color-context";
import { CssBaseline } from "@mui/material";
import { grey, purple } from "@mui/material/colors";

function App() {
  const { themeMode } = useContext(ColorContext);
  const theme = createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === "dark"
        ? {
            primary: {
              main: grey[50],
              dark: grey[500],
            },
            divider: "white",
          }
        : {
            primary: {
              main: purple[700],
              dark: purple[600],
            },
            text: {
              primary: "#0a0a0a",
            },
          }),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlgoContextProvider>
        <Layout>
          <VisualBox />
        </Layout>
      </AlgoContextProvider>
    </ThemeProvider>
  );
}

export default App;
