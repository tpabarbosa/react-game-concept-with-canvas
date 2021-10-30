import { DirectionsTileData, TileData } from "./TileDataType";

export type MonstersTileData = {
    common?: TileData & DirectionsTileData;
    list: {
        [index: string]:TileData & DirectionsTileData;
    };
}