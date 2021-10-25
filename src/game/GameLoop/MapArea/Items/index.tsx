import {useEffect, useContext} from 'react';

import CanvasConext from '../../CanvasContext';
import { ItemType } from './useItems';
import { itemsTiles } from '../../../constants/itemsTiles';


type Props = {
    onLoadItems: () => void;
    items: ItemType[];
    frame: number[];
    mustRender: boolean;
}

export const Items = ({onLoadItems, items, frame, mustRender}: Props) => {
    const ctx = useContext(CanvasConext);

    useEffect(() => {
        if ((mustRender ) ) {
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

                if (ctx && img && tileSize && scaledTileSize && framePos && !item.wasCollected) {
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