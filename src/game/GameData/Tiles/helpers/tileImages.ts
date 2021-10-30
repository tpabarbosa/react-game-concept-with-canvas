import { CharactersTileData } from "../types/CharactersTileDataType";
import { ItemsTilesData } from "../types/ItemsTilesDataType";
import { MapTilesData } from "../types/MapTilesDataType";
import { MonstersTileData } from "../types/MonstersTileDataType";

export const totalImages = (obj: MonstersTileData | CharactersTileData | MapTilesData | ItemsTilesData ) => {
    let total = obj.common?.file ? 1 : 0;
    return total = Object.values(obj.list).reduce((total, tile) => {
        return tile.file ? total += 1 : total;
    }, total)
};