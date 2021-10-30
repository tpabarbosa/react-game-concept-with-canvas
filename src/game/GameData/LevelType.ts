import { ValidDirections } from "../helpers/PositionAndDirection/DirectionsType"
import { Position } from "../helpers/PositionAndDirection/PositionTypes"

export type LevelType = {
    [index: number]: {
        background: number;
        objects: number;
        char: {
            initialPosition: Position;
            initialDirection: ValidDirections;
            refreshTime: number;
        };
        monsters: { 
            refreshTime: number,
            chasingTime: number,
            retreatTime: number,
            list: 
                {
                    monster: number,
                    initialPosition: Position,
                    initialDirection: ValidDirections,
                }[]
        },
        items: {
            refreshTime: number,
            list: 
                {
                    item: number,
                    quantity: number,
                }[]
        }
    }
}