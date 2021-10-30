import { Position } from "./PositionTypes";

export type ValidDirections = 'down' | 'up' | 'left' | 'right';

export type OpositeDirections = {
    [direction in ValidDirections]: ValidDirections ;
}

export type RelativePositionByDirections = {
    [direction in ValidDirections]: Position;
};

export type QuantityByDirection = {
    [direction in ValidDirections]: number;
}