import { useEffect } from 'react';
import { mapDimensions } from '../../../GameData/mapDimensionsData';

type Props = {
    children?: JSX.Element;
    scale: number;
    ctxMap: CanvasRenderingContext2D| null ;
}

export const Grid = ({ctxMap, children, scale}: Props) => {
    const ctx = ctxMap;
    const {cols, rows, tilesize, width, height} = mapDimensions;

    useEffect(() => {
        if(ctx) {
            for(let i = 0; i < rows ; i++) {    
                const y = i * tilesize;         
                ctx.beginPath();
                ctx.moveTo(0, y*scale);
                ctx.lineTo(width*scale, y*scale);
                ctx.stroke();
            }
            for(let j = 0; j < cols ; j++) {
                const x = j * tilesize;
                ctx.beginPath();
                ctx.moveTo(x*scale, 0);
                ctx.lineTo(x*scale, height*scale);
                ctx.stroke();
            } 
        }
        
    }, [ctx, height, width, cols, rows, tilesize, scale]);

    return (children ?? null);
}