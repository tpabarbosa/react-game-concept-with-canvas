import { RelativePositionByDirections } from "../Directions";
import { Position } from "../Position";

export type TileData = {
    name?: string;
    file?: string;
    tilesize?: number;
    scaledTilesize?: number;
    position?: Position;
}

export type DirectionsTileData = {
    directions?: RelativePositionByDirections;
}

export type AnimatedTileData = {
    frames?: Position[];
}

