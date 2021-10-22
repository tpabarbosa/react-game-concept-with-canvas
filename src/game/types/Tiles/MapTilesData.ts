import { TileData } from "./TileData";

export type MapTilesData = {
    common?: TileData;
    list: {
        [index: string]:TileData
    };
}