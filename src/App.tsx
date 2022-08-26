import React, { FC, useCallback, useEffect, useState } from "react";
import { Container, Graphics, Stage } from "@inlet/react-pixi";
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
import { Rectangle, RectangleProps } from "./components/Rectangle";
import { Object } from "./api-legacy/object";

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

interface ObjectContainerProps<T extends Object = Object>
  extends Partial<Pick<RectangleProps, "color">> {
  readonly object: T;
}

const ObjectContainer: FC<ObjectContainerProps> = (props) => {
  const { object, color = Color([255, 0, 0, 111]).rgbNumber() } = props;
  return (
    <Rectangle
      x={object.x * FieldCellSize}
      y={object.y * FieldCellSize}
      width={FieldCellSize}
      height={FieldCellSize}
      color={color}
    />
  );
};

const BotContainer: FC<ObjectContainerProps<Bot>> = (props) => {
  const { object } = props;
  return (
    <ObjectContainer
      color={Color([...object.color, 255]).rgbNumber()}
      object={object}
    />
  );
};

const FieldContainer: FC<FieldContainerProps> = ({ render }) => {
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
            console.log(obj);
            return (
              <BotContainer key={index} object={obj as Bot}></BotContainer>
            );
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
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    field.tick(frame);
  }, [frame]);
  return (
    <>
      <button onClick={() => setFrame(frame + 1)}>hghfghg</button>
      <Stage width={WindowWidth} height={WindowHeight}>
        <FieldContainer render={RenderTypes.NATURAL} />
      </Stage>
    </>
  );
};

export default App;
