import { useEffect, useRef, useState } from "react";
import { mapDimensions } from "../../../GameData/mapDimensionsData";
import { GameState } from "../../../AppStates/GameState";
import { Monsters } from "./Monsters";
import { MonsterType } from "../../../GameEntities/useMonsters";

type Props = {
    monsters: MonsterType[];
    mustRender: boolean;
    gameState: GameState;
}

export const MonstersRender = ({mustRender, gameState, monsters}: Props) => {
    const canvasMonstersRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctxMonsters, setCtxMonsters] = useState<CanvasRenderingContext2D| null>(null);
    const {scaledWidth, scaledHeight} = mapDimensions;
    const [mustUpdateMonsters, setMustUpdateMonsters] = useState(false);

    const onLoadMonsters = (value: boolean = true) => {
        if (value) {
            gameState.updateLoadedImages('MONSTERS');
            setMustUpdateMonsters(false);
        }
    }

    useEffect(() => {
        if(mustRender || gameState.images === 'CHARACTER') {
            setMustUpdateMonsters(true);
        }
    },[mustRender, gameState.images])

    useEffect(() => {
        if (canvasMonstersRef.current) {
            setCtxMonsters(canvasMonstersRef.current.getContext('2d'));
        }
    }, [canvasMonstersRef, setCtxMonsters]);

    return (
        <div>
            <canvas
                id='monsterRendering'
                ref={canvasMonstersRef}
                width={scaledWidth}
                height={scaledHeight}
            />

            {mustUpdateMonsters &&
            <Monsters 
                ctxMonsters={ctxMonsters}
                monsters={monsters}
                onLoadMonsters={onLoadMonsters}
                mustRender={mustUpdateMonsters}
            />
        }

        </div>
    )
}