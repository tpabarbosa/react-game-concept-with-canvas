import { useContext, useEffect } from "react";
import CanvasContext from "../../CanvasContext";

import { mapDimensions } from "../../../constants/mapDimensions";
import { mapBackgrounds } from "../../../constants/mapBackgrounds";
import { mapObjects } from "../../../constants/mapObjects";


type Props = {
    onLoadMap: (value?: boolean) => void;
    scale: number;
    mustRender: boolean;
}

export const Map = ({onLoadMap, scale, mustRender}: Props) => {
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
            drawLayer(mapBackgrounds[1]);
            drawLayer(mapObjects[1]);

            onLoadMap();
        }

    }, [ctx, onLoadMap, mustRender, scale]);

    return (
        <>
        </>
    )
}