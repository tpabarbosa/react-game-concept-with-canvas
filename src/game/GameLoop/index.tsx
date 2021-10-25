import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as S from './styles';

import CanvasContext from "./CanvasContext";

import { Actions, GameProps, transitions } from '../types/GameState';

import { mapDimensions } from '../constants/mapDimensions'

import { useCharacter } from './MapArea/Entities/Character/useCharacter';
import { useMonsters } from './MapArea/Entities/Monsters/useMonsters';
import { useItems } from './MapArea/Items/useItems';

import { MapArea } from './MapArea';
import { Buffering } from './Buffering';
import { phases } from '../constants/phases';
import { useNotStartedState } from './States/useNotStartedState';
import { useInitializedState } from './States/useInitializedState';
import { useRunningState } from './States/useRunningState';
import { useStartedState } from './States/useStartedState';
import { useCountingDownState } from './States/useCountingDownState';
import { usePausedState } from './States/usePausedState';
import { useLifeLostState } from './States/useLifeLostState';
import { useDefeatedState } from './States/useDefeatedState';
import { useReinitializedPhaseState } from './States/useReinitializedPhaseState';
import { useVictoryState } from './States/useVictoryState';

type Props = {
  counterDown: any;
}

export const GameLoop = ({ gameState, gameStateDispatcher, counterDown}: GameProps & Props) => {
    //
    // canvas
    //
    const {width, height, scale} = mapDimensions;
    const canvasRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctx, setCtx] = useState<CanvasRenderingContext2D| null>(null);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const loopRef = useRef<number>();

    const lastTimeChar = useRef<number>();
    const lastTimeMonsters = useRef<number>();
    const lastTimeMonstersChase = useRef<number>();
    const lastTimeItems = useRef<number>();

    const music = useMemo(() => new Audio('assets/audios/music.mp3'), []);
    const audioVictory = useMemo(() => new Audio('assets/audios/victory.mp3'), []);
    const audioDefeat = useMemo(() => new Audio('assets/audios/defeated.mp3'), []);
    const audioClockTicking = useMemo(() => new Audio('assets/audios/clock_ticking.mp3'), []);

    useEffect(() => {
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
        }
    }, [setCtx, canvasRef]);

    //
    //End Game Conditions
    //
    const [hasMonsterWin, setHasMonsterWin] = useState(false);
    const onMonsterWin = () => setHasMonsterWin(true);
        
    const [hasCharWin, setHasCharWin] = useState(false);
    const onCharWin = () => setHasCharWin(true);

    const updateLives = (value: number) => gameStateDispatcher({type: 'lives', value: value});

    const updatePhase = (toShow:number, toLoad: number) => gameStateDispatcher({type: 'phase', value: {showingPhase: toShow, loadingPhase: toLoad}});

    const onImagesBuffered = useCallback(() => {
      gameStateDispatcher({type: 'isMapVisible', value: true});
    }, [gameStateDispatcher]);
    
    //
    //character creation 
    //
    const char = useCharacter({name:'Tati', phase:gameState.phase.loadingPhase});
    //
    // Monsters creation
    //
    const monsters = useMonsters({char:{position: char.position, direction: char.direction}, onMonsterWin: onMonsterWin, gameState: gameState})
    //
    // Items creation
    //
    const items = useItems({onCollectedAll: onCharWin, gameState:gameState});

    const stopLoopTimers = useCallback(()=> {
      lastTimeChar.current=0;
      lastTimeItems.current=0;
      lastTimeMonsters.current=0
      lastTimeMonstersChase.current=0;
    }, [lastTimeMonsters, lastTimeChar, lastTimeItems, lastTimeMonstersChase])


const transition = useCallback((action: Actions | undefined, update: boolean = false) => {
  const newStatus = action ? transitions[gameState.status][action]: undefined;
  if (newStatus) {
    console.log(newStatus);
    gameStateDispatcher({type: 'status', value: newStatus});
  }
  if (update) {
    setIsUpdateRequired(true);
  }
}, [gameState.status, gameStateDispatcher]);
  

  //const notStarted = 
  useNotStartedState({transition, gameState, items, music,   char, monsters, stopLoopTimers});
  //const initialized = 
  useInitializedState({transition, gameState, setHasMonsterWin, setHasCharWin});
  //const started = 
  useStartedState({transition, gameState, counterDown, music});
  //const countingDown = 
  useCountingDownState({transition, gameState, counterDown, music});
  //const running = 
  useRunningState({transition, gameState, char, hasMonsterWin, hasCharWin, updateLives});
  //const paused = 
  usePausedState({transition, gameState, music, audioClockTicking, stopLoopTimers});

  useLifeLostState({transition, gameState, audioDefeat});

  useDefeatedState({transition, gameState, audioDefeat, updateLives, updatePhase, music});

  useReinitializedPhaseState({transition, gameState, char, monsters, stopLoopTimers});

  useVictoryState({transition, gameState, audioVictory, updatePhase, music})
    

    const tick = useCallback((time) => {
      setIsUpdateRequired(false);
      if(gameState.status === 'RUNNING') {
        if(!lastTimeChar.current || time > lastTimeChar.current + phases[gameState.phase.loadingPhase].char.refreshTime) {
          lastTimeChar.current = time;
          char.move();
          items.checkCollected(char.position);
          setIsUpdateRequired(true);
        }
        //monsters animation
        if(!lastTimeMonsters.current || time > lastTimeMonsters.current + phases[gameState.phase.loadingPhase].monsters.refreshTime) {
          lastTimeMonsters.current = time;
          monsters.move();
          setIsUpdateRequired(true);
        }
        //chasing animation
        if(!lastTimeMonstersChase.current || (time > lastTimeMonstersChase.current + phases[gameState.phase.loadingPhase].monsters.retreatTime && !monsters.isChasing)) {
          lastTimeMonstersChase.current = time;
          monsters.changeChasingMode(true);
          setIsUpdateRequired(true);
        }
        if(!lastTimeMonstersChase.current || (time > lastTimeMonstersChase.current + phases[gameState.phase.loadingPhase].monsters.chasingTime && monsters.isChasing)) {
          lastTimeMonstersChase.current = time;
          monsters.changeChasingMode(false);
          setIsUpdateRequired(true);
        }
        //items animation
        if(!lastTimeItems.current || time > lastTimeItems.current + phases[gameState.phase.loadingPhase].items.refreshTime){
          lastTimeItems.current = time;
          items.animate();
          setIsUpdateRequired(true);
        }
      }
                  
      if (isUpdateRequired) {
        gameStateDispatcher({type: 'isMapVisible', value:false});
        gameStateDispatcher({type: 'isMapVisible', value:true});   
        setIsUpdateRequired(false);
      } 
      loopRef.current = requestAnimationFrame(tick);  
      
    }, [isUpdateRequired, gameStateDispatcher,  gameState.status, items, char, monsters, gameState.phase]);

    useEffect(() => {   
        loopRef.current = requestAnimationFrame(tick);
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, tick]);


    // Screen
    return (
        <CanvasContext.Provider value={ctx}>
            <S.Container>
            
            <canvas
                ref={canvasRef}
                width={width*scale}
                height={height*scale}
            />

            <Buffering gameState={gameState} gameStateDispatcher={gameStateDispatcher} onImagesBuffered={onImagesBuffered}/>

            {gameState.isMapVisible && gameState.imagesBuffered==='ALL_IMAGES' &&
                <MapArea gameState={gameState} gameStateDispatcher={gameStateDispatcher} char={{direction: char.direction, pos: char.position}} activeMonsters={monsters.monsters} items={items.items} itemsFrame={items.itemsFrame} scale={scale}/>
            }
            </S.Container>
        </CanvasContext.Provider>
    )
}
