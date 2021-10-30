import { useEffect, useRef, useState } from "react";
import { mapDimensions } from "../../../GameData/mapDimensionsData";
import { GameState } from "../../../GameStates/GameState";
import { ItemType } from "../../../GameEntities/useItems";
import { Items } from './Items';


type Props = {
    items: ItemType[];
    itemsFrame: number[];
    tileData: any[];
    mustRender: boolean;
    gameState: GameState;
}

export const ItemsRender = ({tileData, mustRender, gameState, items, itemsFrame}: Props) => {
    const canvasItemsRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctxItems, setCtxItems] = useState<CanvasRenderingContext2D| null>(null);
    const {scaledWidth, scaledHeight} = mapDimensions;
    const [mustUpdateItems, setMustUpdateItems] = useState(false);

    const onLoadItems = (value: boolean = true) => {
        if (value) {
            gameState.updateLoadedImages('ITEMS');
            setMustUpdateItems(false);
        }
    }

    useEffect(() => {
        if(mustRender || gameState.images === 'MAP') {
            setMustUpdateItems(true);
        }
    },[mustRender, gameState.images])

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

            {mustUpdateItems &&
            <Items 
                ctxItems={ctxItems}
                items={items} 
                onLoadItems={onLoadItems}
                frame={itemsFrame}  
                tileData={tileData}
                mustRender={mustUpdateItems}
            />
        }

        </div>
    )
}