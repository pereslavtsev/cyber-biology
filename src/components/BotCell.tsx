import { Bot, Rotations } from "../api-legacy/bot/classes/bot.class";
import * as PIXI from "pixi.js";
import {
  BotOutlineColor,
  DrawBotHead,
  DrawBotOutline,
  FieldCellSizeHalf,
} from "../api-legacy/settings";
import Color from "color";
import { Graphics } from "@inlet/react-pixi";
import { ObjectCell, ObjectCellProps } from "./ObjectCell";
import { FC, useCallback } from "react";

const BotCell: FC<ObjectCellProps<Bot>> = (props) => {
  const { object } = props;

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.lineStyle(1, 0x000000, 1);
      g.moveTo(FieldCellSizeHalf, FieldCellSizeHalf);
      g.lineTo(
        FieldCellSizeHalf + Rotations[object.direction].x * FieldCellSizeHalf,
        FieldCellSizeHalf + Rotations[object.direction].y * FieldCellSizeHalf
      );
    },
    [object.direction]
  );

  return (
    <ObjectCell
      color={Color([...object.color, 255]).rgbNumber()}
      object={object}
      {...(DrawBotOutline
        ? { borderWidth: 1, borderColor: Color(BotOutlineColor).rgbNumber() }
        : {})}
    >
      {DrawBotHead && <Graphics draw={draw} />}
    </ObjectCell>
  );
};

export { BotCell };
