import { useContext, useEffect } from "react";
import CanvasContext from "../../contexts/CanvasContext";

import { mapDimensions } from "../mapDimensions";
import { Layers } from "../mapLayers";

type Props = {
    onLoadMap: (value?: boolean) => void;
    scale: number;
    mustRender: boolean;
}

export const Map = ({onLoadMap, scale, mustRender}: Props) => {
    const ctx = useContext(CanvasContext);

    useEffect(() => {
        if (mustRender) {
            const {cols, rows, tileSize} = mapDimensions;
            const drawLayer = (grid: any) => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        const item = grid[i][j];
                        if (!item) {
                            continue;
                        }                
                        const img: HTMLImageElement | null = document.querySelector(`#map-tile-img-${item}`);
                        const x = j * tileSize;
                        const y = i * tileSize;
                        
                        if (ctx && img) {
                            ctx.drawImage(img, 
                                0, 
                                0, 
                                tileSize, 
                                tileSize,
                                x*scale, 
                                y*scale, 
                                tileSize*scale, 
                                tileSize*scale,
                            );
                        }
                        
                    }
                }
            };
            drawLayer(Layers[0]);
            drawLayer(Layers[1]);

            onLoadMap();
        }

    }, [ctx, onLoadMap, mustRender, scale]);

    return (
        <>
        </>
    )
}