import { useEffect, useRef, useState } from "react";
import { mapDimensions } from "../../../constants/mapDimensions";
import { phases } from "../../../constants/phases";
import { GameProps } from "../../../types/GameState";
import { Map } from '../../MapArea/Map';


export const MapRender = ({gameState, gameStateDispatcher}: GameProps) => {
    const canvasMapRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctxMap, setCtxMap] = useState<CanvasRenderingContext2D| null>(null);
    const {scaledWidth, scaledHeight} = mapDimensions;
    const [mustRenderMap, setMustRenderMap] = useState(true);

    const onLoadMap = (value: boolean = true) => {
        if (value) {
            gameStateDispatcher({type: 'imagesLoaded', value: 'MAP'});
            setMustRenderMap(false);
        }
    }

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

            {gameState.imagesLoaded ==='NO_IMAGES' &&
                <Map 
                    ctxMap={ctxMap}
                    onLoadMap={onLoadMap} 
                    mustRender={mustRenderMap}
                    background={phases[gameState.phase.loadingPhase].background}
                    objects={phases[gameState.phase.loadingPhase].objects}
                />   
            } 
        </div>
    )
}