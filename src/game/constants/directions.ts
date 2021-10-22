import * as Directions from "../types/Directions";
import { ChasingTypes } from "./monstersData";

export const directions: Directions.ValidDirections[]= [
    'up', 'down', 'left', 'right'
];

export const opositeDirections: Directions.OpositeDirections =  { up: 'down', down:'up', left:'right', right:'left' };

export const relativePositionByDirections: Directions.RelativePositionByDirections = {
    down: {x:0, y:1},
    left: {x:-1, y:0},
    right: {x:1, y:0},
    up: {x:0, y:-1},
}

export const getChasingRelativePositions = (chasingType: ChasingTypes): Directions.RelativePositionByDirections => {
    switch (chasingType) {
        case 'CHAR_CHASE':
            return {
                up: {x: 0, y: 0},
                down: {x:0, y: 0},
                left: {x: 0, y:0},
                right: {x:0, y:0}
            }
        case 'FRONT_CHASE':
            return {
                up: {x: 0, y: -2},
                down: {x:0, y: 2},
                left: {x: -2, y:0},
                right: {x:2, y:0}
            }
        case 'RIGHT_CHASE': {
            return {
                up: {x: -2, y: 0},
                down: {x:2, y: 0},
                left: {x: 0, y:-2},
                right: {x:0, y:2}
            }
        }
        default:
            return {
                up: {x: 0, y: 0},
                down: {x:0, y: 0},
                left: {x: 0, y:0},
                right: {x:0, y:0}
            }
    }
    
}
