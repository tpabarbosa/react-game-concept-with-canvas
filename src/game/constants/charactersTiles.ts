import { CharactersTileData } from "../types/Tiles/CharactersTileData";
import { mapDimensions } from './mapDimensions';

export const characters: CharactersTileData = {
    common: {
        tilesize: mapDimensions.tilesize,
        scaledTilesize: mapDimensions.scaledTilesize,
    },
    list: {
        1: {
            tilesize: 30,
            file: 'assets/char/char.png',
            directions:  {
                down: {x: 0, y: 0},
                left: {x: 0, y: 1},
                right: {x: 0, y: 2},
                up: {x: 0, y: 3},
            },
        }
        
    },

}

