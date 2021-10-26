import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as S from './styles';

import CanvasContext from "./CanvasContext";

import { Actions, GameProps, transitions } from '../types/GameState';

import { mapDimensions } from '../constants/mapDimensions'

import { useCharacter } from './MapArea/Entities/Character/useCharacter';
import { useMonsters } from './MapArea/Entities/Monsters/useMonsters';
import { useItems } from './MapArea/Items/useItems';

import { MapArea } from './MapArea';
import { Buffering } from './Buffering';

import { countingDownState } from './States/countingDownState';
import { PhaseStatus, StatesType } from './States/StateProps';
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
import { useLoopAnimation } from './LoopAnimation/useLoopAnimation';
import { ValidDirections } from '../types/Directions';

type Props = {
  counterDown: any;
  audioPlayer: any;
  userLastInput: {subtype: string, value:ValidDirections|null} | null;
  onHandledButtonClick: () => void;
}

export const GameLoop = ({ onHandledButtonClick, userLastInput, gameState, gameStateDispatcher, counterDown, audioPlayer}: GameProps & Props) => {

    // canvas
    const {scaledWidth, scaledHeight} = mapDimensions;
    const canvasRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctx, setCtx] = useState<CanvasRenderingContext2D| null>(null);

    useEffect(() => {
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
        }
    }, [setCtx, canvasRef]);

    const onImagesBuffered = useCallback(() => {
      gameStateDispatcher({type: 'isMapVisible', value: true});
    }, [gameStateDispatcher]);



    //End Game
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

    const updateCollected = useCallback((toAdd: number) => {
      const total = toAdd ? gameState.totalCollected + toAdd : 0;
      if (toAdd) {audioPlayer.play('coinCollected')};
      gameStateDispatcher({type: 'totalCollected', value:total });
    },[gameStateDispatcher, audioPlayer, gameState.totalCollected]);

    //character creation 
    const char = useCharacter({name:'Tati', phase:gameState.phase.loadingPhase});
    
    // Monsters creation
    const monsters = useMonsters({char:{position: char.position, direction: char.direction}, onMonsterWin: onMonsterWin, gameState: gameState})

    // Items creation
    const items = useItems({updateCollected, onCollectedAll: onCharWin, gameState:gameState});

    //LoopAnimation
    const loopAnimation = useLoopAnimation({gameStateDispatcher, gameState, char, items, monsters});

    //PhaseStatus
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
      setIsUpdateRequired: loopAnimation.setIsUpdateRequired,
      setHasMonsterWin,
      setHasCharWin,
      updateLives,
      updatePhase,
      updateCollected,
      stopLoopTimers: loopAnimation.stopLoopTimers,
    }},[char, items, monsters, hasMonsterWin, hasCharWin, audioPlayer, counterDown, gameState, loopAnimation.stopLoopTimers, updateLives, updatePhase, updateCollected, loopAnimation.setIsUpdateRequired]);

  //States
  const states:StatesType   = useMemo(()=> {return {
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

  //Transitions
  const transition = useCallback((action: Actions | undefined | void) => {
    const newStatus = action ? transitions[gameState.status][action]: undefined;
    if (newStatus) {
      gameStateDispatcher({type: 'status', value: newStatus});
      setState(states[newStatus]);
    }
  }, [gameState.status, gameStateDispatcher, setState, states]);
  
  //stateHandler
  useEffect(() => {
    transition(state.handleState({phaseStatus}));
  },[state, phaseStatus, transition])

  //buttonHandler
  useEffect(() => {
    if(userLastInput) {
      transition(state.handleUserInput({input:{type:'buttonclick', subtype:userLastInput.subtype, value:userLastInput.value}},{phaseStatus}));
      onHandledButtonClick();
    }
  },[state, phaseStatus, transition, userLastInput, onHandledButtonClick])

  //keyHandler
  const handleKeyPress = (e: KeyboardEvent) => {
    transition(state.handleUserInput({input:{type:'keypress', value:e}},{phaseStatus}));
  }
  useEvent('keyup', handleKeyPress);

    // Screen
    return (
        <CanvasContext.Provider value={ctx}>
            <S.Container>
            
            <canvas
                ref={canvasRef}
                width={scaledWidth}
                height={scaledHeight}
            />

            <Buffering gameState={gameState} gameStateDispatcher={gameStateDispatcher} onImagesBuffered={onImagesBuffered}/>

            {gameState.isMapVisible && gameState.imagesBuffered==='ALL_IMAGES' &&
                <MapArea gameState={gameState} gameStateDispatcher={gameStateDispatcher} char={{direction: char.direction, pos: char.position}} activeMonsters={monsters.monsters} items={items.items} itemsFrame={items.itemsFrame} />
            }
            </S.Container>
        </CanvasContext.Provider>
    )
}
