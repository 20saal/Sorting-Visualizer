import "./App.css";
import VisualBox from "./components/visual-box/VisualBox";
import { useEffect, useState } from "react";
import Layout from "./components/layout/layout";
import { AlgoContextProvider } from "./store/algo-contect";

function App() {
  useEffect(() => {}, []);
  return (
    <AlgoContextProvider>
      <Layout>
        <VisualBox />
      </Layout>
    </AlgoContextProvider>
  );
}

export default App;
