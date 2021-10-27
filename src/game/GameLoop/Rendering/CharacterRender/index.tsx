import { useEffect, useRef, useState } from "react";
import { mapDimensions } from "../../../constants/mapDimensions";
import { GameProps } from "../../../types/GameState";
import { ValidDirections } from "../../../types/Directions";
import { Position } from "../../../types/Position";
import { Character } from "../../MapArea/Entities/Character";

type Props = {
    direction: ValidDirections;
    position: Position;
    mustRender: boolean;
}

export const CharacterRender = ({mustRender, gameState, gameStateDispatcher, direction, position}: GameProps & Props) => {
    const canvasCharacterRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctxCharacter, setCtxCharacter] = useState<CanvasRenderingContext2D| null>(null);
    const {scaledWidth, scaledHeight} = mapDimensions;
    const [mustRenderCharacter, setMustRenderCharacter] = useState(false);

    const onLoadCharacter = (value: boolean = true) => {
        if (value) {
            gameStateDispatcher({type: 'imagesLoaded', value: 'CHARACTER'});
            setMustRenderCharacter(false);
        }
    }

    useEffect(() => {
        if(mustRender) {
            setMustRenderCharacter(true);
        }
    },[mustRender])

    useEffect(() => {
        if (canvasCharacterRef.current) {
            setCtxCharacter(canvasCharacterRef.current.getContext('2d'));
        }
    }, [canvasCharacterRef, setCtxCharacter]);

    return (
        <div>
            <canvas
                id='characterRendering'
                ref={canvasCharacterRef}
                width={scaledWidth}
                height={scaledHeight}
            />

            {(gameState.imagesLoaded==='ITEMS' || mustRender) &&
            <Character 
                ctxCharacter={ctxCharacter}
                direction={direction} 
                position={position} 
                onLoadCharacter={onLoadCharacter}
                mustRender={mustRenderCharacter}
            />
            }

        </div>
    )
}