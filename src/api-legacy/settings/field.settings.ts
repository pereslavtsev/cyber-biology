import { InterfaceBorder } from './gui.settings';

//-----------------------------------------------------------------
// Field

// export const FieldBackgroundColor = [255, 255, 255, 255];

export const FieldX = InterfaceBorder;
export const FieldY = InterfaceBorder;

export const FieldCellSize = 8;
export const FieldCellSizeHalf = FieldCellSize / 2;

//constexpr uint ScreenCellsWidth = ((WindowWidth - InterfaceBorder * 2 - GUIWindowWidth) / FieldCellSize);
export const ScreenCellsWidth = 12 * 16;

// Должно делиться на 8 без остатка если нужны 4 потока! И на 16 без остатка если 8 потоков и т.д.!
export const FieldCellsWidth = ScreenCellsWidth * 30;
export const FieldCellsHeight = 133;

let FieldRenderCellsWidth = 202;

if (ScreenCellsWidth < FieldRenderCellsWidth) {
  FieldRenderCellsWidth = ScreenCellsWidth;
}

export { FieldRenderCellsWidth };

export const FieldWidth = FieldCellSize * FieldRenderCellsWidth;
export const FieldHeight = FieldCellSize * FieldCellsHeight;
//-----------------------------------------------------------------
