import { useEffect, useRef, useState } from "react";
import { mapDimensions } from "../../../constants/mapDimensions";
import { GameProps } from "../../../types/GameState";
import { Monsters } from "../../MapArea/Entities/Monsters";
import { MonsterType } from "../../MapArea/Entities/Monsters/useMonsters";

type Props = {
    activeMonsters: MonsterType[];
    mustRender: boolean;
}

export const MonstersRender = ({mustRender, gameState, gameStateDispatcher, activeMonsters}: GameProps & Props) => {
    const canvasMonstersRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctxMonsters, setCtxMonsters] = useState<CanvasRenderingContext2D| null>(null);
    const {scaledWidth, scaledHeight} = mapDimensions;
    const [mustRenderMonsters, setMustRenderMonsters] = useState(mustRender);

    const onLoadMonsters = (value: boolean = true) => {
        if (value) {
            gameStateDispatcher({type: 'imagesLoaded', value: 'MONSTERS'});
            setMustRenderMonsters(false);
        }
    }

    useEffect(() => {
        if(mustRender) {
            setMustRenderMonsters(true);
        }
    },[mustRender])

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

            {(gameState.imagesLoaded==='CHARACTER' || mustRender) &&
            <Monsters 
                ctxMonsters={ctxMonsters}
                activeMonsters={activeMonsters}
                onLoadMonsters={onLoadMonsters}
                mustRender={mustRenderMonsters}
            />
        }

        </div>
    )
}