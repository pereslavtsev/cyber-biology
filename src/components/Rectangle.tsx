import * as PIXI from "pixi.js";
import { Graphics } from "@inlet/react-pixi";
import { FC, useCallback } from "react";

export interface RectangleProps {
  readonly x?: number;
  readonly y?: number;
  readonly width: number;
  readonly height: number;
  readonly color: number;
}

const Rectangle: FC<RectangleProps> = (props) => {
  const { x = 0, y = 0, width, height, color } = props;
  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(color);
      g.drawRect(x, y, width, height);
      g.endFill();
    },
    [color, height, width, x, y]
  );

  return <Graphics draw={draw} />;
};

export { Rectangle };
