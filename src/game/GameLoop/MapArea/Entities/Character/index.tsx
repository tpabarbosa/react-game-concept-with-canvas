import {useEffect, useContext} from 'react';

import CanvasConext from '../../../CanvasContext';
import { characters } from '../../../../constants/charactersTiles';
import { Position } from '../../../../types/Position';
import { ValidDirections } from '../../../../types/Directions';

type Props = {
    onLoadCharacter: () => void;
    direction: ValidDirections;
    position: Position;
    scale:number;
    mustRender: boolean;
}

export const Character = ({onLoadCharacter, direction, position, scale, mustRender}: Props) => {
    const ctx = useContext(CanvasConext);

    useEffect(() => {
        if (mustRender) {
            const img: HTMLImageElement | null = document.querySelector(`#char-tile-img`);

            const data = characters.list[1].directions ?? characters.common?.directions;
            const dir = data ? data[direction] : undefined;

            const tileSize = characters.list[1].tilesize ?? characters.common?.tilesize;
            const scaledTileSize = characters.list[1].scaledTilesize ?? characters.common?.scaledTilesize;


            if (img && ctx && dir && characters.list[1].file && tileSize && scaledTileSize) {
                
                ctx.drawImage(
                    img,
                    dir.x * tileSize,
                    dir.y * tileSize,
                    tileSize,
                    tileSize,
                    position.x * scaledTileSize,
                    position.y * scaledTileSize,
                    scaledTileSize,
                    scaledTileSize,
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

