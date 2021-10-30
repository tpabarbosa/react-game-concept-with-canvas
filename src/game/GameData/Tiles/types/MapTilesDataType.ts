import { TileData } from "./TileDataType";

export type MapTilesData = {
    common?: TileData;
    list: {
        [index: string]:TileData
    };
}