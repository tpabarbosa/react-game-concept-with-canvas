import { Position } from "../../valueObjects/Position";

type ItemTileType = {
    imageFile: string;
    frames: Position[]
}

export type ItemsTilesType = {
    [index: string]: ItemTileType;
}

export const itemsTileImages: ItemsTilesType = {
    1: {imageFile: 'assets/items/coin_gold.png',
        frames: [
            {x:4, y:0},
            {x:5, y:0},
            {x:6, y:0},
            {x:7, y:0},
            {x:0, y:0},
            {x:1, y:0},
            {x:2, y:0},
            {x:3, y:0},
        ]
    },
    2: {imageFile: 'assets/items/coin_silver.png',
        frames: [
            {x:4, y:0},
            {x:5, y:0},
            {x:6, y:0},
            {x:7, y:0},
            {x:0, y:0},
            {x:1, y:0},
            {x:2, y:0},
            {x:3, y:0},
            
        ]
    },
};