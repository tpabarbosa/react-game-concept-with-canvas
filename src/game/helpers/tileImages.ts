import { CharactersTileData } from "../types/Tiles/CharactersTileData";
import { ItemsTilesData } from "../types/Tiles/ItemsTilesData";
import { MapTilesData } from "../types/Tiles/MapTilesData";
import { MonstersTileData } from "../types/Tiles/MonstersTileData";

export const totalImages = (obj: MonstersTileData | CharactersTileData | MapTilesData | ItemsTilesData) => {
    let total = obj.common?.file ? 1 : 0;
    return total = Object.values(obj.list).reduce((total, tile) => {
        return tile.file ? total += 1 : total;
    }, total)
};