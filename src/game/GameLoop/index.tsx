import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as S from './styles';

import CanvasContext from "./CanvasContext";

import { Actions, GameProps, Status, transitions } from '../types/GameState';

import { mapDimensions } from '../constants/mapDimensions'

import { useCharacter } from './MapArea/Entities/Character/useCharacter';
import { useMonsters } from './MapArea/Entities/Monsters/useMonsters';
import { useItems } from './MapArea/Items/useItems';

import { MapArea } from './MapArea';
import { Buffering } from './Buffering';
import { phases } from '../constants/phases';
import { useAudioPlayer } from './AudioPlayer/useAudioPlayer';

import { countingDownState } from './States/countingDownState';
import { PhaseStatus } from './States/StateProps';
import { defeatedState } from './States/defeatedState';
import { initializedState } from './States/initializedState';
import { lifeLostState } from './States/lifeLostState';
import { notStartedState } from './States/notStartedState';
import { reinitializedState } from './States/reinitializedState';
import { pausedState } from './States/pausedState';
import { runningState } from './States/runningState';
import { startedState } from './States/startedState';
import { victoryState } from './States/victoryState';
import { useEvent } from '../../hooks/useEvent';

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

    const audioPlayer = useAudioPlayer();

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

    const updateLives = useCallback((value: number) => {
      gameStateDispatcher({type: 'lives', value: value})
    },[gameStateDispatcher]);

    const updatePhase = useCallback((toShow:number, toLoad: number) =>{
      gameStateDispatcher({type: 'phase', value: {showingPhase: toShow, loadingPhase: toLoad}})
    },[gameStateDispatcher]);

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


    const phaseStatus: PhaseStatus = useMemo(() => {return {
      char,
      items,
      monsters,
      hasMonsterWin,
      hasCharWin,
      audioPlayer,
      counterDown,
      gameStatus: gameState.status,
      imagesLoaded: gameState.imagesLoaded,
      lives: gameState.lives,
      showingPhase: gameState.phase.showingPhase,
      loadingPhase: gameState.phase.loadingPhase,
      setIsUpdateRequired,
      setHasMonsterWin,
      setHasCharWin,
      updateLives,
      updatePhase,
      stopLoopTimers
    }},[char, items, monsters, hasMonsterWin, hasCharWin, audioPlayer, counterDown, gameState, stopLoopTimers, updateLives, updatePhase]);

type statesType = {
  [state in Status]:() => any;
}

const states:statesType   = useMemo(()=> {return {
  'COUNTING_DOWN': () => countingDownState(),
  'DEFEATED': ( ) => defeatedState(),
  'INITIALIZED': ( ) => initializedState(),
  'LIFE_LOST': ( ) => lifeLostState(),
  'NOT_STARTED': ( ) => notStartedState(),
  'PAUSED': ( ) => pausedState(),
  'REINITIALIZED_PHASE': ( ) => reinitializedState(),
  'RUNNING': ( ) => runningState(),
  'STARTED': ( ) => startedState(),
  'VICTORY': ( ) => victoryState(),
}},[]);

const [state, setState] = useState(states[gameState.status]);

const transition = useCallback((action: Actions | undefined) => {
  const newStatus = action ? transitions[gameState.status][action]: undefined;
  if (newStatus) {
    console.log(newStatus);
    gameStateDispatcher({type: 'status', value: newStatus});
    setState(states[newStatus]);
  }
}, [gameState.status, gameStateDispatcher, setState, states]);
  

  useEffect(() => {
    transition(state.handleState({phaseStatus}));
    
  },[state, phaseStatus, transition])

  const handleKeyPress = (e: KeyboardEvent) => {
    transition(state.handleKeyPress(e,{phaseStatus}));
  }

  useEvent('keyup', handleKeyPress);

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
