import {useEffect} from 'react';

import { ItemType } from './useItems';
import { itemsTiles } from '../../../constants/itemsTiles';


type Props = {
    onLoadItems: () => void;
    items: ItemType[];
    frame: number[];
    mustRender: boolean;
    ctxItems: CanvasRenderingContext2D| null 
}

export const Items = ({ctxItems, onLoadItems, items, frame, mustRender}: Props) => {
    const ctx = ctxItems;

    useEffect(() => {
        if ((ctx && mustRender && items ) ) {
            ctx.clearRect(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
            items.forEach(item => { 
                let key: number | string;
                if (itemsTiles.list[item.type].file) {
                    key = item.type;
                } else {
                    key = 'common';
                }
                const img: HTMLImageElement | null = document.querySelector(`#items-tile-img-${key}`);
                const tileSize = itemsTiles.list[item.type].tilesize ?? itemsTiles.common?.tilesize;
                const scaledTileSize = itemsTiles.list[item.type].scaledTilesize ?? itemsTiles.common?.scaledTilesize;

                let frames = itemsTiles.list[item.type].frames;

                let framePos = frames ? frames[frame[0]]:undefined;

                if (img && tileSize && scaledTileSize && framePos && !item.wasCollected) {
                    ctx.drawImage(
                        img,
                        framePos.x * tileSize,
                        framePos.y * tileSize,
                        tileSize,
                        tileSize,
                        item.position.x * scaledTileSize,
                        item.position.y * scaledTileSize,
                        scaledTileSize,
                        scaledTileSize,
                    );
                }
            })
            
            onLoadItems();
            
        }
            
    }, [ctx, items, onLoadItems, frame, mustRender]);
    

    return (
        <>   
        </>
    );
};