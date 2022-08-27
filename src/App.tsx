import React, { FC, useEffect, useState } from "react";
import { Container, Stage, useApp, useTick } from "@inlet/react-pixi";
import { Field, RenderTypes } from "./api-legacy/field";
import {
  FieldBackgroundColor,
  FieldHeight,
  FieldWidth,
  FieldX,
  FieldY,
  WindowWidth,
  WindowHeight,
  OceanHeight,
  FieldCellSize,
  OceanColor,
  DrawOcean,
  MudLayerHeight,
  MudColor,
  DrawMudLayer,
} from "./api-legacy/settings";
import Color from "color";
import { Bot } from "./api-legacy/bot";
import { Rectangle } from "./components/Rectangle";
import { BotCell } from "./components/BotCell";
import { Apple } from "./api-legacy/apple";
import { AppleCell } from "./components/AppleCell";

const field = new Field();

const MainRect: FC = () => (
  <Rectangle
    width={FieldWidth}
    height={FieldHeight}
    color={Color(FieldBackgroundColor).rgbNumber()}
  />
);

const OceanRect: FC = () => (
  <Rectangle
    y={FieldHeight - OceanHeight * FieldCellSize}
    width={FieldWidth}
    height={OceanHeight * FieldCellSize}
    color={Color(OceanColor).rgbNumber()}
  />
);

const MudLayerRect: FC = () => (
  <Rectangle
    y={FieldHeight - MudLayerHeight * FieldCellSize}
    width={FieldWidth}
    height={MudLayerHeight * FieldCellSize}
    color={Color(MudColor).rgbNumber()}
  />
);

interface FieldContainerProps {
  readonly render: RenderTypes;
}

const FieldContainer: FC<FieldContainerProps> = ({ render }) => {
  const [frame, setFrame] = useState(0);
  const app = useApp();
  useTick(() => {
    setFrame(frame + 1);
  });
  useEffect(() => {
    field.tick(frame);
    app.render();
  }, [app, frame]);

  return (
    <Container x={FieldX} y={FieldY}>
      <MainRect />
      {DrawOcean && <OceanRect />}
      {DrawMudLayer && <MudLayerRect />}
      {field.allCells.flat().map((obj, index) => {
        if (!obj) {
          return null;
        }
        switch (obj.constructor) {
          case Bot: {
            //console.log(obj);
            return <BotCell key={index} object={obj as Bot} />;
          }
          case Apple: {
            return <AppleCell key={index} x={obj.x * FieldCellSize} y={obj.y * FieldCellSize} />;
          }
          default: {
            return null;
          }
        }
      })}
    </Container>
  );
};

const App: FC = () => {
  return (
    <>
      <Stage width={WindowWidth} height={WindowHeight}>
        <FieldContainer render={RenderTypes.NATURAL} />
      </Stage>
    </>
  );
};

export default App;
