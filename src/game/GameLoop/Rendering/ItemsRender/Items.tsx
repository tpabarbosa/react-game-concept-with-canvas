import {useEffect} from 'react';
import { ItemType } from '../../../GameEntities/useItems';


type Props = {
    onLoadItems: () => void;
    items: ItemType[];
    frame: number[];
    tileData: any[];
    mustRender: boolean;
    ctxItems: CanvasRenderingContext2D| null 
}

export const Items = ({tileData, ctxItems, onLoadItems, items, frame, mustRender}: Props) => {
    const ctx = ctxItems;

    useEffect(() => {
        if ((ctx && mustRender && items) ) {
            ctx.clearRect(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
            items.forEach((item) => { 
                const index = item.type -1;
                const img: HTMLImageElement | null = document.querySelector(tileData[index].img);
                const tileSize = tileData[index].tileSize;
                const scaledTileSize = tileData[index].scaledTileSize;

                let framePos = tileData[index].framesPos[frame[0]];

                if (img && !item.wasCollected) {
                    ctx.drawImage(
                        img,
                        framePos.x,
                        framePos.y,
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
            
    }, [ctx, items, onLoadItems, frame, mustRender, tileData]);
    

    return (
        <>   
        </>
    );
};