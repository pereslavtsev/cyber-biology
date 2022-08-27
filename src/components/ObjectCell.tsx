import Color from "color";
import { Rectangle, RectangleProps } from "./Rectangle";
import { FieldCellSize } from "../api-legacy/settings";
import { Object } from "../api-legacy/object";
import { FC } from "react";

export interface ObjectCellProps<T extends Object = Object>
  extends Partial<
    Pick<RectangleProps, "color" | "borderColor" | "borderWidth">
  > {
  readonly object: T;
}

const ObjectCell: FC<ObjectCellProps> = (props) => {
  const {
    object,
    color = Color([255, 0, 0, 111]).rgbNumber(),
    ...restProps
  } = props;
  return (
    <Rectangle
      x={object.x * FieldCellSize}
      y={object.y * FieldCellSize}
      width={FieldCellSize}
      height={FieldCellSize}
      color={color}
      {...restProps}
    />
  );
};

export { ObjectCell };
