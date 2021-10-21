import {ValidDirections, RelativePositionDirections} from '../MapArea/Entities/EntitiesDirections';

export type Position = {
    x: number; 
    y: number
}

export class Point {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x=x; 
        this.y=y;
    }

    isEqual(other:Point):boolean {
        return this.x===other.x && this.y===other.y;
    }

    addFromPoint(other: Point) {
        return new Point(this.x+other.x, this.y+other.y);
    }

    addFromDirection(
        directions: RelativePositionDirections,
        direction: ValidDirections) {

        return new Point(this.x+directions[direction].x, this.y+directions[direction].y);
    }

    static areEqual(pointA: Point, pointB:Point):boolean {
        return pointA.x===pointB.x && pointA.y===pointB.y;
    }

    static getDistance(pointA: Point, pointB: Point):number {
        return Math.round(Math.sqrt(Math.pow(pointA.x-pointB.x, 2) + Math.pow(pointA.y-pointB.y,2)));
    }
    
    static fromPosition(position: Position): Point {
        return new Point(position.x, position.y);
    }
}