import { Box } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { boxItemStyles } from "../../helpers/constant";
import AlgoContext from "../../store/algo-contect";
import { styled } from "@mui/material/styles";

export default function BoxElem(props) {
  const { length, item, itemIndex, BubbColorState, SelColorState, minIndex } =
    props;
  const { algo } = useContext(AlgoContext);

  let elemBgColor;

  switch (algo) {
    case "Selection-Sort": {
      elemBgColor =
        (itemIndex === SelColorState.currindex && SelColorState.color) ||
        (itemIndex === minIndex ? "#d62445" : "white");
      break;
    }
    case "Bubble-Sort": {
      //this was not working as bgColor
      elemBgColor =
        itemIndex === BubbColorState.currindex ||
        itemIndex === BubbColorState.currindex + 1
          ? BubbColorState.color
          : "white";
      break;
    }
  }

  let elemWidth = 30;
  useEffect(() => {
    if (length > 10) {
      elemWidth = 24;
    }
    if (length > 15) {
      elemWidth = 10;
    }
    if (length > 20) {
      elemWidth = 15;
    }
  }, []);

  return (
    <Box
      key={item}
      sx={{
        ...boxItemStyles,
        borderRadius: { xs: 0.32, sm: 0.75 },
        width: elemWidth,
        height:
          item < 12
            ? (item * 20) / 1.15
            : item < 20
            ? (item * 18.75) / 1.15
            : (item * 18) / 1.15,
        bgcolor: elemBgColor,
      }}
    />
  );
}
