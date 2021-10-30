import { RelativePositionByDirections, ValidDirections } from "./DirectionsType";
import { Position } from "./PositionTypes";


export const areEqual = (posA: Position, posB: Position): boolean => {
    return posA.x === posB.x && posA.y === posB.y;
}

export const addPositions = (posA: Position, posB: Position): Position => {
    return {
        x: posA.x + posB.x, 
        y: posA.y + posB.y
    };
}

export const addFromDirection = (position: Position, direction: ValidDirections, directions: RelativePositionByDirections):Position => {
    return {
        x: position.x + directions[direction].x,
        y: position.y + directions[direction].y
    }
}

export const getDistance = (posA: Position, posB: Position): number => {
    return Math.round(
            Math.sqrt(Math.pow(posA.x-posB.x, 2) + Math.pow(posA.y-posB.y,2))
        );
}