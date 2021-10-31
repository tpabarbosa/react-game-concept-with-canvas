import { useState, useEffect, useMemo, useRef } from 'react';
import * as S from './styles';

import { GameState } from '../AppStates/GameState';
import { LevelState, LevelStatus } from '../AppStates/LevelState';
import { useLoopAnimation } from './LoopAnimation/useLoopAnimation';
import { useEvent } from '../helpers/useEvent';

import { LevelStateFuncType, LevelStatesType } from './LevelStates/LevelStateFunction';
import { levelNotStarted } from './LevelStates/levelNotStarted';
import { levelIdleState } from './LevelStates/levelIdleState';
import { countingDownState } from './LevelStates/countingDownState';
import { runningState } from './LevelStates/runningState';
import { lifeLostState } from './LevelStates/lifeLostState';
import { pausedState } from './LevelStates/pausedState';
import { defeatedState } from './LevelStates/defeatedState';
import { victoryState } from './LevelStates/victoryState';

import { ValidDirections } from '../helpers/PositionAndDirection/DirectionsType';
import { MapRender } from './Rendering/MapRender';
import { ItemsRender } from './Rendering/ItemsRender';
import { CharacterRender } from './Rendering/CharacterRender';
import { MonstersRender } from './Rendering/MonstersRender';


type Props = {
  userLastInput: {subtype: string, value:ValidDirections|null} | null;
  onButtonClick: () => void;
  gameState: GameState;
  levelState: LevelState;
}

export const GameLoop = ({ onButtonClick, userLastInput, gameState, levelState}: Props) => {

  useLoopAnimation(levelState);
  
  const lastLevelState = useRef<LevelStatus>();
  //States
  const levelStates:LevelStatesType   = useMemo(()=> {return {
    'LEVEL_NOT_STARTED': () => levelNotStarted(),
    'LEVEL_IDLE': ( ) => levelIdleState(),
    'COUNTING_DOWN': () => countingDownState(),
    'RUNNING': ( ) => runningState(),
    'LIFE_LOST': ( ) => lifeLostState(),
    'PAUSED': ( ) => pausedState(),
    'VICTORY_LEVEL_ENDED': ( ) => victoryState(),
    'DEFEATED_LEVEL_ENDED': ( ) => defeatedState(),
  }},[]);

  const [actualLevelState, setActualLevelState] = useState<LevelStateFuncType|null>(null);

  //stateHandler
  useEffect(() => {
    if(!actualLevelState) {
      setActualLevelState(levelStates[levelState.status]);
    }
  }, [actualLevelState, levelStates, levelState.status])

  //buttonHandler
  useEffect(() => {
    if(userLastInput && actualLevelState) {
      actualLevelState.onUserInput({type:'buttonclick', subtype:userLastInput.subtype, value:userLastInput.value},levelState, gameState);
      onButtonClick();
    }
  },[actualLevelState, levelStates, levelState, gameState, userLastInput, onButtonClick])

  // //keyHandler
  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    if (actualLevelState) {
      actualLevelState.onUserInput({type:'keypress', value:e},levelState, gameState);
    }
  }
  useEvent('keyup', handleKeyPress);

  useEffect(() => {
    if ( levelState.status !== lastLevelState.current) {
      setActualLevelState(levelStates[levelState.status]);
      levelStates[levelState.status]().onEnter(levelState, gameState);
      lastLevelState.current = levelState.status;
      
    } else {
      actualLevelState && actualLevelState.onState(levelState, gameState);
    }
  },[levelState.status, levelStates, actualLevelState, gameState, levelState])




    // Screen
    return (
      <S.Container>
        <MapRender gameState={gameState} level={levelState.levelToRender}/>
      
        <ItemsRender gameState={gameState} items={levelState.items.items} itemsFrame={levelState.items.itemsFrame} tileData={levelState.items.tileData} mustRender={levelState.items.updateRequired}/>

        <CharacterRender gameState={gameState} position={levelState.char.position} direction={levelState.char.direction} mustRender={levelState.char.updateRequired}/>

        <MonstersRender gameState={gameState} monsters={levelState.monsters.monsters} mustRender={levelState.monsters.updateRequired}/>

      </S.Container>
    )
}
