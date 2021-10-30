import * as Directions from "../helpers/PositionAndDirection/DirectionsType";

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


