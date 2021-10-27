import {useEffect} from 'react';

import { characters } from '../../../../constants/charactersTiles';
import { Position } from '../../../../types/Position';
import { ValidDirections } from '../../../../types/Directions';

type Props = {
    onLoadCharacter: () => void;
    direction: ValidDirections;
    position: Position;
    mustRender: boolean;
    ctxCharacter: CanvasRenderingContext2D| null 
}

export const Character = ({ctxCharacter, onLoadCharacter, direction, position, mustRender}: Props) => {
    const ctx = ctxCharacter;

    useEffect(() => {
        if (ctx && mustRender) {
            ctx.clearRect(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
            const img: HTMLImageElement | null = document.querySelector(`#char-tile-img`);

            const data = characters.list[1].directions ?? characters.common?.directions;
            const dir = data ? data[direction] : undefined;

            const tileSize = characters.list[1].tilesize ?? characters.common?.tilesize;
            const scaledTileSize = characters.list[1].scaledTilesize ?? characters.common?.scaledTilesize;

            if (img && dir && tileSize && scaledTileSize) {
                
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
    }, [ctx, mustRender, position, direction, onLoadCharacter]);
    

    return (
        <>
        </>
    );
};

