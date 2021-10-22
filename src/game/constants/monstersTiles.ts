
import { MonstersTileData } from '../types/Tiles/MonstersTileData';
import { mapDimensions } from './mapDimensions';

export const monsters: MonstersTileData = {
    common: {
        tilesize: mapDimensions.tilesize,
        scaledTilesize: mapDimensions.scaledTilesize,
        file: 'assets/monster/monster01.png',
        directions: {
            down: {x: 0, y: 0},
            left: {x: 0, y: 1},
            right: {x: 0, y: 2},
            up: {x: 0, y: 3},
        },
    },
    list: {

    },
}
