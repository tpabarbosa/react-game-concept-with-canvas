import { useEffect, useRef, useState } from "react";
import { mapDimensions } from "../../../GameData/mapDimensionsData";
import { GameState } from "../../../AppStates/GameState";
import { ValidDirections } from "../../../helpers/PositionAndDirection/DirectionsType";
import { Position } from "../../../helpers/PositionAndDirection/PositionTypes";
import { Character } from "./Character";

type Props = {
    direction: ValidDirections;
    position: Position;
    mustRender: boolean;
    gameState: GameState;
}

export const CharacterRender = ({mustRender, gameState, direction, position}: Props) => {
    const canvasCharacterRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctxCharacter, setCtxCharacter] = useState<CanvasRenderingContext2D| null>(null);
    const {scaledWidth, scaledHeight} = mapDimensions;
    const [mustUpdateCharacter, setMustUpdateCharacter] = useState(false);

    const onLoadCharacter = (value: boolean = true) => {
        if (value) {
            gameState.updateLoadedImages('CHARACTER');
            setMustUpdateCharacter(false);
        }
    }

    useEffect(() => {
        if(mustRender || gameState.images === 'ITEMS') {
            setMustUpdateCharacter(true);
        }
    },[mustRender, gameState.images])

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

            {(mustUpdateCharacter) &&
            <Character 
                ctxCharacter={ctxCharacter}
                direction={direction} 
                position={position} 
                onLoadCharacter={onLoadCharacter}
                mustRender={mustUpdateCharacter}
            />
            }

        </div>
    )
}