import { TileData, AnimatedTileData } from "./TileDataType";

export type ItemsTilesData = {
    common?: TileData & AnimatedTileData;
    list: {
        [index: string]: TileData & AnimatedTileData;
    };
}
