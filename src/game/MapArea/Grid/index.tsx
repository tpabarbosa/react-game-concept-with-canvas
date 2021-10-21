import { useEffect , useContext } from 'react';

import CanvasContext from '../../contexts/CanvasContext';

import { mapDimensions } from '../mapDimensions';

type Props = {
    children?: JSX.Element;
    scale: number
}

export const Grid = ({children, scale}: Props) => {
    const ctx = useContext(CanvasContext);
    const {cols, rows, tileSize, width, height} = mapDimensions;

    useEffect(() => {
        if(ctx) {
            for(let i = 0; i < rows ; i++) {    
                const y = i * tileSize;         
                ctx.beginPath();
                ctx.moveTo(0, y*scale);
                ctx.lineTo(width*scale, y*scale);
                ctx.stroke();
            }
            for(let j = 0; j < cols ; j++) {
                const x = j * tileSize;
                ctx.beginPath();
                ctx.moveTo(x*scale, 0);
                ctx.lineTo(x*scale, height*scale);
                ctx.stroke();
            } 
        }
        
    }, [ctx, height, width, cols, rows, tileSize, scale]);

    return (children ?? null);
}