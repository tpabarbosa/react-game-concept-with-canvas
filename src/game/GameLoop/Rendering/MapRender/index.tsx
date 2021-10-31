import { useEffect, useRef, useState } from "react";
import { mapDimensions } from "../../../GameData/mapDimensionsData";
import { levels } from "../../../GameData/levelsData";
import { GameState } from "../../../AppStates/GameState";
import { Map } from './Map';

type Props = {
    gameState: GameState;
    level:number;
}

export const MapRender = ({gameState, level}: Props) => {
    const canvasMapRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctxMap, setCtxMap] = useState<CanvasRenderingContext2D| null>(null);
    const {scaledWidth, scaledHeight} = mapDimensions;
    const [mustUpdateMap, setMustUpdateMap] = useState(true);

    const onLoadMap = (value: boolean = true) => {
        if (value) {
            gameState.updateLoadedImages('MAP');
            setMustUpdateMap(false);
        }
    }

    useEffect(() => {
        if(gameState.images==='NO_IMAGES') {
            setMustUpdateMap(true);
        }
    },[gameState.images])

    useEffect(() => {
        if (canvasMapRef.current) {
            setCtxMap(canvasMapRef.current.getContext('2d'));
        }
    }, [canvasMapRef, setCtxMap]);

    return (
        <div>
            <canvas
                id='mapRendering'
                ref={canvasMapRef}
                width={scaledWidth}
                height={scaledHeight}
            />
            {mustUpdateMap &&
                <Map 
                    ctxMap={ctxMap}
                    onLoadMap={onLoadMap} 
                    mustRender={mustUpdateMap}
                    background={levels[level].background}
                    objects={levels[level].objects}
                /> 
            }  
        </div>
    )
}