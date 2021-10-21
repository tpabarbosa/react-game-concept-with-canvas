import {useEffect, useContext} from 'react';

import CanvasConext from '../../../contexts/CanvasContext';
import {mapDimensions} from '../../mapDimensions';
import { ItemType } from './useItems';
import { itemsTileImages} from '../itemsTileImages';


type Props = {
    onLoadItems: () => void;
    items: ItemType[];
    scale: number;
    frame: number[];
    mustRender: boolean;
}

export const Items = ({onLoadItems, items, scale, frame, mustRender}: Props) => {
    const ctx = useContext(CanvasConext);

    useEffect(() => {
        if ((mustRender ) ) {
            items.forEach(item => { 
                const img: HTMLImageElement | null = document.querySelector(`#items-tile-img-${item.type}`);
                const {tileSize} = mapDimensions;

                let test= itemsTileImages[item.type].frames[frame
                    [0]];

                if (ctx && img && !item.wasCollected) {
                    ctx.drawImage(
                        img,
                        test.x * tileSize,
                        test.y * tileSize,
                        tileSize,
                        tileSize,
                        item.position.x * tileSize *scale,
                        item.position.y * tileSize *scale,
                        tileSize*scale,
                        tileSize*scale,
                    );
                }
            })
            
            onLoadItems();
            
        }
            
    }, [ctx, items, onLoadItems, frame, mustRender, scale]);
    

    return (
        <>   
        </>
    );
};