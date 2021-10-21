import {useEffect, useContext} from 'react';

import CanvasConext from '../../../contexts/CanvasContext';
import {char} from '../entities';
import * as Directions from '../EntitiesDirections';
import {mapDimensions} from '../../mapDimensions';
import { Point } from '../../../valueObjects/Position';

type Props = {
    onLoadCharacter: () => void;
    direction: Directions.ValidDirections;
    position: Point;
    scale:number;
    mustRender: boolean;
}

export const Character = ({onLoadCharacter, direction, position, scale, mustRender}: Props) => {
    const ctx = useContext(CanvasConext);

    useEffect(() => {
        if (mustRender) {
            const img: HTMLImageElement | null = document.querySelector(`#char-tile-img`);
            if (img && ctx && char.tileData) {
                const data = char.tileData;
                ctx.drawImage(
                    img,
                    data.imagePositions[direction].x * data.tileSize,
                    data.imagePositions[direction].y * data.tileSize,
                    data.tileSize,
                    data.tileSize,
                    position.x * (mapDimensions.tileSize )*scale,
                    position.y * (mapDimensions.tileSize )*scale,
                    data.tileSize*scale,
                    data.tileSize*scale,
                );
                onLoadCharacter();
            }
            
        };  
    }, [ctx, mustRender, position, direction, scale, onLoadCharacter]);
    

    return (
        <>
        </>
    );
};

