import {ObjectTypes} from "../enums/object-types.enum";

export interface IObject
{
  // private:

  // Prev. tick frame number
  lastTickFrame: uint;

  //Static pointers to field class and cells array
  // Field* static_pField;
  // Object*** static_pCells;

  // protected:

    //X coordinate, corrected with Field::RenderX
  screenX: int;

   calcScreenX(): void;
   calcObjectRect(): void;
   calcObjectRectShrinked(shrink: int): void;

  //Time in ticks since object was created
   lifetime: uint;

  //Used for drawing
  // object_rect: SDL_Rect;

  //Pointers to Field class and cells array
  // Object* (*pCells)[FieldCellsWidth][FieldCellsHeight];
  // Field* pField;
  // FieldDynamicParams* pParams;


  // public:

  x: int, y: int;

  //If an object stores energy it's here
  energy: int;

  type(): ObjectTypes;
  image_sensor_val(): float;


  // Basic 'dummy' draw functions if needed
  draw(): void;
  drawEnergy(): void;
  drawPredators(): void;

  /*This function returns 1 when the object is destroyed.
  You should call it on every simulation tick before you
  call same function in derived class
  Returns:
  0 - all fine
  1 - object destroyed
  2 - nothing to do(last tick frame matches current frame)*/
  tick(): int;

  getLifetime(): uint;
  setLifetime(uint: uint): void;


  CurrentFrame: uint;
  SetPointers(field: IField, cells: IObject): void;

  // protected:

    //Texture rectangle
    //  image_rect: Rect;
}
