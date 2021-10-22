import { DirectionsTileData, TileData } from "./TileData";

export type MonstersTileData = {
    common?: TileData & DirectionsTileData;
    list: {
        [index: string]:TileData & DirectionsTileData;
    };
}