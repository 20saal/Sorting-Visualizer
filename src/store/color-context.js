import React, { useMemo, useState } from "react";

const ColorContext = React.createContext({
  toggleColor: () => {},
  themeMode: "light",
});

export const ColorContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const toggleColor = useMemo(() => {
    const toggleColorMode = () => {
      setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
    };
    return toggleColorMode;
  }, []);
  const cntxValue = {
    themeMode,
    toggleColor,
  };
  return (
    <ColorContext.Provider value={cntxValue}>{children}</ColorContext.Provider>
  );
};

export default ColorContext;
