import { ValidDirections } from "../types/Directions"
import { Position } from "../types/Position"

type PhaseType = {
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

export const phases: PhaseType= {
    1: {
        background: 1,
        objects: 1,
        char: {
            //char: 1,
            initialPosition: {x: 7, y: 8},
            initialDirection: 'down',
            refreshTime: 280,
        },
        monsters: { 
            refreshTime: 380,
            chasingTime: 12000,
            retreatTime: 5000,
            list: [
                {
                    monster: 1,
                    initialPosition: {x: 2, y: 2},
                    initialDirection: 'down',
                },
                {
                    monster: 2,
                    initialPosition: {x: 12, y: 2},
                    initialDirection: 'down',
                }
            ],
        },
        items: {
            refreshTime: 125,
            list: [
                {
                    item: 1,
                    quantity: 10,
                },
                {
                    item: 2,
                    quantity: 20,
                }
            ]
        }
    }

}