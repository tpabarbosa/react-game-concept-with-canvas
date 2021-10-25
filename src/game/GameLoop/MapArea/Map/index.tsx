import { useContext, useEffect } from "react";
import CanvasContext from "../../CanvasContext";

import { mapDimensions } from "../../../constants/mapDimensions";
import { mapBackgrounds } from "../../../constants/mapBackgrounds";
import { mapObjects } from "../../../constants/mapObjects";


type Props = {
    onLoadMap: (value?: boolean) => void;
    mustRender: boolean;
    background: number;
    objects: number;
}

export const Map = ({onLoadMap, mustRender, background, objects}: Props) => {
    const ctx = useContext(CanvasContext);

    useEffect(() => {
        if (mustRender) {
            const {cols, rows, tilesize, scaledTilesize} = mapDimensions;
            const drawLayer = (grid: any) => {
                
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        const item = grid[i][j];
                        if (!item) {
                            continue;
                        }                
                        const img: HTMLImageElement | null = document.querySelector(`#map-tile-img-${item}`);
                        
                        if (ctx && img) {
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