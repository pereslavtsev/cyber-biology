import * as PIXI from "pixi.js";
import { _ReactPixi, Container, Graphics } from "@inlet/react-pixi";
import { FC, useCallback } from "react";

export interface RectangleProps extends _ReactPixi.IContainer {
  readonly x?: number;
  readonly y?: number;
  readonly width: number;
  readonly height: number;
  readonly color: number;
  readonly borderWidth?: number;
  readonly borderColor?: number;
}

const Rectangle: FC<RectangleProps> = (props) => {
  const {
    x = 0,
    y = 0,
    width,
    height,
    color,
    borderWidth = 0,
    borderColor = color,
    children,
    ...restProps
  } = props;
  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      if (borderColor && borderWidth) {
        g.lineStyle(borderWidth, borderColor, 1);
      }
      g.beginFill(color);
      g.drawRect(0, 0, width, height);
      g.endFill();
    },
    [borderColor, borderWidth, color, height, width]
  );

  return (
    <Container x={x} y={y} {...restProps}>
      <Graphics draw={draw} />
      {children}
    </Container>
  );
};

export { Rectangle };
