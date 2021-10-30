import { DirectionsTileData, TileData } from "./TileDataType";

export type CharactersTileData = {
    common?: TileData & DirectionsTileData;
    list: {
        [index: string]:TileData & DirectionsTileData
    };
}
