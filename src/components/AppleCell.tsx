import { FC, useCallback } from "react";
import { _ReactPixi, Graphics } from "@inlet/react-pixi";
import { AppleDrawColor, FieldCellSizeHalf } from "../api-legacy/settings";
import Color from "color";
import * as PIXI from "pixi.js";

const AppleCell: FC<Omit<_ReactPixi.IGraphics, "draw">> = (props) => {
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(Color(AppleDrawColor).rgbNumber());
    g.drawCircle(FieldCellSizeHalf, FieldCellSizeHalf, FieldCellSizeHalf);
    g.endFill();
  }, []);
  return <Graphics draw={draw} {...props} />;
};

export { AppleCell };
