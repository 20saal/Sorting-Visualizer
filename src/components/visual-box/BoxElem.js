import { Box } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { boxItemStyles } from "../../helpers/constant";
import AlgoContext from "../../store/algo-contect";
import { styled } from "@mui/material/styles";

export default function BoxElem(props) {
  const { length, item, itemIndex, colorState, minIndex } = props;
  const { algo } = useContext(AlgoContext);

  const { BubbColorState, SelColorState, InsertionColorState } = colorState;
  let elemBgColor;

  switch (algo) {
    case "Algorithams": {
      elemBgColor = "white";
      break;
    }
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
    case "Insertion-Sort":
      {
        if (
          itemIndex >= InsertionColorState.unOrdIndex &&
          InsertionColorState.unOrdIndex
        ) {
          elemBgColor = "pink";
        } else if (itemIndex === InsertionColorState.currindex) {
          elemBgColor = "red";
        } else {
          elemBgColor = "white";
        }
      }
      break;
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
