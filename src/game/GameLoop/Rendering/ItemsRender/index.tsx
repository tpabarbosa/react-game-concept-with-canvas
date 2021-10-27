import { useEffect, useRef, useState } from "react";
import { mapDimensions } from "../../../constants/mapDimensions";
import { GameProps } from "../../../types/GameState";
import { ItemType } from "../../MapArea/Items/useItems";
import { Items } from '../../MapArea/Items';

type Props = {
    items: ItemType[];
    itemsFrame: number[];
    mustRender: boolean;
}

export const ItemsRender = ({mustRender, gameState, gameStateDispatcher, items, itemsFrame}: GameProps & Props) => {
    const canvasItemsRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctxItems, setCtxItems] = useState<CanvasRenderingContext2D| null>(null);
    const {scaledWidth, scaledHeight} = mapDimensions;
    const [mustRenderItems, setMustRenderItems] = useState(false);

    const onLoadItems = (value: boolean = true) => {
        if (value) {
            gameStateDispatcher({type: 'imagesLoaded', value: 'ITEMS'});
            setMustRenderItems(false);
        }
    }

    useEffect(() => {
        if(mustRender) {
            setMustRenderItems(true);
        }
    },[mustRender])

    useEffect(() => {
        if (canvasItemsRef.current) {
            setCtxItems(canvasItemsRef.current.getContext('2d'));
        }
    }, [canvasItemsRef, setCtxItems]);

    return (
        <div>
            <canvas
                id='itemsRendering'
                ref={canvasItemsRef}
                width={scaledWidth}
                height={scaledHeight}
            />

            {(gameState.imagesLoaded==='MAP' || mustRender)&&
            <Items 
                ctxItems={ctxItems}
                items={items} 
                onLoadItems={onLoadItems}
                frame={itemsFrame}  
                mustRender={mustRenderItems}
            />
        }

        </div>
    )
}