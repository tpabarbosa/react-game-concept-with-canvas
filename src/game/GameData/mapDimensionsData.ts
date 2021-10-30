const tilesize = 32;
const scaledTilesize = 24;
const scale = scaledTilesize/tilesize;
const rows = 17;
const cols = 15;

export const mapDimensions = {
    tilesize,
    scaledTilesize,
    cols,
    rows,
    width: tilesize * cols,
    height: tilesize * rows,
    scaledWidth: tilesize * cols * scale,
    scaledHeight: tilesize * rows * scale,
    scale,
}