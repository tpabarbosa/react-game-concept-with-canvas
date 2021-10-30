import { RelativePositionByDirections } from "../../../helpers/PositionAndDirection/DirectionsType";
import { Position } from "../../../helpers/PositionAndDirection/PositionTypes";

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

