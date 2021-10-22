import { DirectionsTileData, TileData } from "./TileData";

export type CharactersTileData = {
    common?: TileData & DirectionsTileData;
    list: {
        [index: string]:TileData & DirectionsTileData
    };
}
