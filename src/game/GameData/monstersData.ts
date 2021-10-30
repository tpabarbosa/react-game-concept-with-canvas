import * as Directions from "../helpers/PositionAndDirection/DirectionsType";

export type ChasingTypes = 'CHAR_CHASE' | 'FRONT_CHASE' | 'RIGHT_CHASE';

type MonstersData = {
    [index: number]: {
        name: string;
        chasingType: ChasingTypes;
    }
}

export const monstersData: MonstersData = {
    1: {
        name: 'John',
        chasingType: 'CHAR_CHASE',
    },
    2: {
        name: 'Mary',
        chasingType: 'FRONT_CHASE',
    },
    3: {
        name: 'Joseph',
        chasingType: 'RIGHT_CHASE',
    }
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