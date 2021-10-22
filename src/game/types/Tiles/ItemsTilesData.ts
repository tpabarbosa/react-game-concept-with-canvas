import { TileData, AnimatedTileData } from "./TileData";

export type ItemsTilesData = {
    common?: TileData & AnimatedTileData;
    list: {
        [index: string]: TileData & AnimatedTileData;
    }
    
}
