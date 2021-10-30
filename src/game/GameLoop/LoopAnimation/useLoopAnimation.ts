import { useCallback, useEffect, useMemo, useRef } from "react";
import { levels } from "../../GameData/levelsData";
import { LevelState } from "../../GameStates/LevelState";

export type LoopAnimationType = void;

export const useLoopAnimation = (levelState:  LevelState):LoopAnimationType => {
    
    const loopRef = useRef<number>();

    const refreshTime = useMemo(() => {
        return {
            char: levels[levelState.levelToRender].char.refreshTime,
            items: levels[levelState.levelToRender].items.refreshTime,
            monsters: levels[levelState.levelToRender].monsters.refreshTime,
            monstersRetreat: levels[levelState.levelToRender].monsters.retreatTime,
            monstersChasing: levels[levelState.levelToRender].monsters.chasingTime
        }
    }, [levelState.levelToRender])

    const lastTimeChar = useRef<number>(0);
    const lastTimeMonsters = useRef<number>(0);
    const lastTimeMonstersChase = useRef<number>(0);
    const lastTimeItems = useRef<number>(0);

    const tick = useCallback((time) => {
        // console.time('Teste')
        if(levelState.status === 'RUNNING') {
            
            if(!lastTimeChar.current || time - lastTimeChar.current >= refreshTime.char) {
                lastTimeChar.current = time ;
                levelState.char.move();
            }
          //monsters animation
            if(!lastTimeMonsters.current || time - lastTimeMonsters.current >= refreshTime.monsters) {
                lastTimeMonsters.current = time;
                levelState.monsters.move();
            }
          //chasing animation
            if(!lastTimeMonstersChase.current || (time - lastTimeMonstersChase.current >= refreshTime.monstersRetreat && !levelState.monsters.isChasing)) {
                lastTimeMonstersChase.current = time;
                levelState.monsters.changeChasingMode(true);
            }
            if(!lastTimeMonstersChase.current || (time - lastTimeMonstersChase.current >= refreshTime.monstersChasing && levelState.monsters.isChasing)) {
                lastTimeMonstersChase.current = time;
                levelState.monsters.changeChasingMode(false);
            }
          //items animation
            if(!lastTimeItems.current || time - lastTimeItems.current >= refreshTime.items){
                lastTimeItems.current = time;
                levelState.items.animate();
            }
        }

        levelState.char.setUpdateRequired(false);
        levelState.monsters.setUpdateRequired(false);
        levelState.items.setUpdateRequired(false);
                    
        if(levelState.status === 'RUNNING') {
            loopRef.current = requestAnimationFrame(tick);  
        }
        // console.timeEnd('Teste')
    }, [levelState.status, levelState.char, levelState.monsters, levelState.items, refreshTime]);

    useEffect(() => {
        if (levelState.status === 'LEVEL_NOT_STARTED' || levelState.status === 'LIFE_LOST') {
            lastTimeChar.current=0;
            lastTimeItems.current=0;
            lastTimeMonsters.current=0
            lastTimeMonstersChase.current=0;
        }
    }, [levelState.status, lastTimeMonsters, lastTimeChar, lastTimeItems, lastTimeMonstersChase])

    useEffect(() => {   
        if(levelState.status === 'RUNNING') {
            loopRef.current = requestAnimationFrame(tick);
        }
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, tick, levelState.status]);

    return

}