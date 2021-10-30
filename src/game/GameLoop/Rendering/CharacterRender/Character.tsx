import {useEffect} from 'react';

import { charactersTiles } from '../../../GameData/Tiles/charactersTiles';
import { Position } from '../../../helpers/PositionAndDirection/PositionTypes';
import { ValidDirections } from '../../../helpers/PositionAndDirection/DirectionsType';

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

            const data = charactersTiles.list[1].directions ?? charactersTiles.common?.directions;
            const dir = data ? data[direction] : undefined;

            const tileSize = charactersTiles.list[1].tilesize ?? charactersTiles.common?.tilesize;
            const scaledTileSize = charactersTiles.list[1].scaledTilesize ?? charactersTiles.common?.scaledTilesize;

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

