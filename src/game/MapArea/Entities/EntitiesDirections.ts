export type ValidDirections = 'down' | 'up' | 'left' | 'right';


export type RelativePositionDirections = {
    [direction in ValidDirections]: {x: number, y: number};
};

export type Distances = {
    [direction in ValidDirections]: number;
}

export type OpositeDirections = {
    [direction in ValidDirections]: ValidDirections ;
}

export const oposite: OpositeDirections =  { up: 'down', down:'up', left:'right', right:'left' };

export const relative: RelativePositionDirections = {
    down: {x:0, y:1},
    left: {x:-1, y:0},
    right: {x:1, y:0},
    up: {x:0, y:-1},
}