import { useCallback, useEffect, useRef, useState } from "react";
import { phases } from "../../constants/phases";
import { GameProps } from "../../types/GameState";

type Props = {
    char: any;
    items: any;
    monsters: any;
}

export const useLoopAnimation = ({gameStateDispatcher, gameState, char, items, monsters}: GameProps & Props) => {
    const [isCharUpdateRequired, setIsCharUpdateRequired] = useState(false);
    const [isMonstersUpdateRequired, setIsMonstersUpdateRequired] = useState(false);
    const [isItemsUpdateRequired, setIsItemsUpdateRequired] = useState(false);
    const loopRef = useRef<number>();

    const lastTimeChar = useRef<number>();
    const lastTimeMonsters = useRef<number>();
    const lastTimeMonstersChase = useRef<number>();
    const lastTimeItems = useRef<number>();

    const stopLoopTimers = useCallback(()=> {
        lastTimeChar.current=0;
        lastTimeItems.current=0;
        lastTimeMonsters.current=0
        lastTimeMonstersChase.current=0;
    }, [lastTimeMonsters, lastTimeChar, lastTimeItems, lastTimeMonstersChase])

    const tick = useCallback((time) => {
        
        if(gameState.status === 'RUNNING') {
            if(!lastTimeChar.current || time > lastTimeChar.current + phases[gameState.phase.loadingPhase].char.refreshTime) {
                lastTimeChar.current = time ;
                char.move();
                items.checkCollected(char.position);
                setIsCharUpdateRequired(true);
            }
          //monsters animation
            if(!lastTimeMonsters.current || time > lastTimeMonsters.current + phases[gameState.phase.loadingPhase].monsters.refreshTime) {
                lastTimeMonsters.current = time;
                monsters.move();
                setIsMonstersUpdateRequired(true);
            }
          //chasing animation
            if(!lastTimeMonstersChase.current || (time > lastTimeMonstersChase.current + phases[gameState.phase.loadingPhase].monsters.retreatTime && !monsters.isChasing)) {
                lastTimeMonstersChase.current = time;
                monsters.changeChasingMode(true);
            }
            if(!lastTimeMonstersChase.current || (time > lastTimeMonstersChase.current + phases[gameState.phase.loadingPhase].monsters.chasingTime && monsters.isChasing)) {
                lastTimeMonstersChase.current = time;
                monsters.changeChasingMode(false);
            }
          //items animation
            if(!lastTimeItems.current || time > lastTimeItems.current + phases[gameState.phase.loadingPhase].items.refreshTime){
                lastTimeItems.current = time;
                items.animate();
                setIsItemsUpdateRequired(true);
            }
        }

        setIsCharUpdateRequired(false);
        setIsMonstersUpdateRequired(false);
        setIsItemsUpdateRequired(false);
                    
        if(gameState.status === 'RUNNING') {
            loopRef.current = requestAnimationFrame(tick);  
        }

    }, [gameState.status, items, char, monsters, gameState.phase]);

    useEffect(() => {   
        if(gameState.status === 'RUNNING'){
            loopRef.current = requestAnimationFrame(tick);
        }
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, tick, gameState.status]);
  
    return {
        setIsCharUpdateRequired,
        setIsMonstersUpdateRequired,
        setIsItemsUpdateRequired,
        isCharUpdateRequired,
        isMonstersUpdateRequired,
        isItemsUpdateRequired,
        stopLoopTimers
    }

}