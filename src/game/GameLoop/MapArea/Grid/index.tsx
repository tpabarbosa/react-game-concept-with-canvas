import { useEffect , useContext } from 'react';

import CanvasContext from '../../CanvasContext';

import { mapDimensions } from '../../../constants/mapDimensions';

type Props = {
    children?: JSX.Element;
    scale: number
}

export const Grid = ({children, scale}: Props) => {
    const ctx = useContext(CanvasContext);
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