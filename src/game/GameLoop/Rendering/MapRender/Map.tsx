import { useEffect } from "react";

import { mapDimensions } from "../../../GameData/mapDimensionsData";
import { mapBackgrounds } from "../../../GameData/mapBackgroundsData";
import { mapObjects } from "../../../GameData/mapObjectsData";


type Props = {
    onLoadMap: (value?: boolean) => void;
    mustRender: boolean;
    background: number;
    objects: number;
    ctxMap: CanvasRenderingContext2D| null 
}

export const Map = ({ctxMap, onLoadMap, mustRender, background, objects}: Props) => {
    const ctx = ctxMap;

    useEffect(() => {
        if (mustRender && ctx) {
            const {cols, rows, tilesize, scaledTilesize} = mapDimensions;
            const drawLayer = (grid: any) => {
                
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        const item = grid[i][j];
                        if (!item) {
                            continue;
                        }                
                        const img: HTMLImageElement | null = document.querySelector(`#map-tile-img-${item}`);
                        
                        if (img) {
                            ctx.drawImage(img, 
                                0, 
                                0, 
                                tilesize, 
                                tilesize,
                                j*scaledTilesize, 
                                i*scaledTilesize, 
                                scaledTilesize, 
                                scaledTilesize,
                            );
                        }
                        
                    }
                }
            };
            drawLayer(mapBackgrounds[background]);
            drawLayer(mapObjects[objects]);

            onLoadMap();
        }

    }, [ctx, onLoadMap, mustRender, background, objects]);


    return (
        <>
        </>
    )
}