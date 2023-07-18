export interface IImageFactory {
  // private:

  // SDL_Texture* apple;
  // SDL_Texture* organics;
  // SDL_Texture* rock;
  //
  // SDL_Texture* bot_body;
  // SDL_Texture* bot_head[8];
  //
  // SDL_Texture* TurnSurfaceToStaticTexture(SDL_Surface* surf);
  // void DrawRectOnSurface(vector<uint32_t>& pixels, Rect rect, int surf_w, int color = 0x000000ff);

  CreateApple(): void;
  CreateOrganics(): void;
  CreateRock(): void;
  CreateBot(): void;

  // public:
  CreateImages(): void;
  DeleteImages(): void;
}
