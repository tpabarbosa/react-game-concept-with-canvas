import { ItemsTilesData } from "./types/ItemsTilesDataType";
import { mapDimensions } from "../mapDimensionsData";
import { totalImages } from "./helpers/tileImages";

export const itemsTiles: ItemsTilesData = {
    common: {
        tilesize: mapDimensions.tilesize,
        scaledTilesize: mapDimensions.scaledTilesize,
    },
    list: {
        1: {file: 'assets/items/coin_gold.png',
            frames: [
                {x:4, y:0},
                {x:5, y:0},
                {x:6, y:0},
                {x:7, y:0},
                {x:0, y:0},
                {x:1, y:0},
                {x:2, y:0},
                {x:3, y:0},
            ],
        },
        2: {file: 'assets/items/coin_silver.png',
            frames: [
                {x:4, y:0},
                {x:5, y:0},
                {x:6, y:0},
                {x:7, y:0},
                {x:0, y:0},
                {x:1, y:0},
                {x:2, y:0},
                {x:3, y:0},
            ],
        },
    }
    
};

export const itemsTotalTiles =  totalImages(itemsTiles);