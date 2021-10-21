import { Distances } from "./EntitiesDirections";

export const getDistance = (PosA: {x: number; y:number}, PosB: {x: number; y:number}) => {
    return Math.round(Math.sqrt(Math.pow(PosA.x-PosB.x, 2) + Math.pow(PosA.y-PosB.y,2)));
}

export const minDistance = (distances: Distances) => {
    const array = Object.values(distances);
    return Math.min(...array.filter(value => value !== -1))
}