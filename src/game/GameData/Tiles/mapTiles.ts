
import { MapTilesData } from './types/MapTilesDataType';
import { mapDimensions } from '../mapDimensionsData';
import { totalImages } from './helpers/tileImages';

export const mapTiles: MapTilesData = {
    common: {
        tilesize: mapDimensions.tilesize,
        scaledTilesize: mapDimensions.scaledTilesize,
    },
    list: {
        1: {file: 'assets/map/floor_grass_1.png'},
        2: {file: 'assets/map/floor_rock_1.png'},
        3: {file: 'assets/map/floor_sand_1.png'},
        4: {file: 'assets/map/tree_bottom_1.png'},
        5: {file: 'assets/map/tree_top_1.png'},
        6: {file: 'assets/map/tree_top_2.png'},
        7: {file: 'assets/map/bush_1.png'},
        8: {file: 'assets/map/rock_1.png'},
    }
    
};

export const mapTotalTiles =  totalImages(mapTiles);
