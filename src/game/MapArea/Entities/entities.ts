import * as Directions from './EntitiesDirections';
import {Point} from '../../valueObjects/Position';

export type ChasingTypes = 'CHAR_CHASE' | 'FRONT_CHASE' | 'RIGHT_CHASE' | 'RELATIVE_CHASE';

export type TileData = {
    tileSize: number;
    imageFile: string;
    imagePositions: Directions.RelativePositionDirections;
}

type Entity =  {
    tileData?: TileData;
    name?: string;
    initialPosition: Point;
    initialDirection: Directions.ValidDirections;
}

export type Monster = Entity & {
    name: string;
    chasingType: ChasingTypes;
    chasingRelativePositions: Directions.RelativePositionDirections;
}

type Monsters = {
    totalImages: number;
    commonData?: TileData;
    monstersList: Monster[];
}

export const char: Entity = {
    tileData: {
        tileSize: 30,
        imageFile: 'assets/char/char.png',
        imagePositions:  {
            down: {x: 0, y: 0},
            left: {x: 0, y: 1},
            right: {x: 0, y: 2},
            up: {x: 0, y: 3},
        },
    },
    initialPosition: new Point(7, 8),
    initialDirection: 'down',
}

export const monsters: Monsters = {
    totalImages: 1,
    commonData: {
        tileSize: 32,
        imageFile: 'assets/monster/monster01.png',
        imagePositions:  {
            down: {x: 0, y: 0},
            left: {x: 0, y: 1},
            right: {x: 0, y: 2},
            up: {x: 0, y: 3},
        },
    },
    monstersList: [
        {
            name: 'John',
            initialPosition: new Point(2, 2),
            initialDirection: 'down',
            chasingType: 'CHAR_CHASE',
            chasingRelativePositions: {
                up: {x: 0, y: 0},
                down: {x:0, y: 0},
                left: {x: 0, y:0},
                right: {x:0, y:0}
            }
        },
        {
            name: 'Mary',
            initialPosition: new Point(12, 2),
            initialDirection: 'down',
            chasingType: 'FRONT_CHASE',
            chasingRelativePositions: {
                up: {x: 0, y: -2},
                down: {x:0, y: 2},
                left: {x: -2, y:0},
                right: {x:2, y:0}
            }
        },
        {
            name: 'Joseph',
            initialPosition: new Point(12, 14),
            initialDirection: 'down',
            chasingType: 'RIGHT_CHASE',
            chasingRelativePositions: {
                up: {x: -2, y: 0},
                down: {x:2, y: 0},
                left: {x: 0, y:-2},
                right: {x:0, y:2}
            }
        },
    ],
};
