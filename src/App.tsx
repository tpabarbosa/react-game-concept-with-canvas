import { useReducer } from 'react';
import * as S from './App.styles';
import { GameLoop } from './game/GameLoop';
import { GameUI } from './game/GameUI';

import { GameState, GameStateActions } from './game/types/GameStatus';

const App = () => {
  const initialGameStatus: GameState = {
    imagesBuffered: 'NO_IMAGES',
    imagesLoaded: 'NO_IMAGES',
    status: 'NOT_STARTED',
    isMapVisible: true,
  };

  const gameStateReducer = (state: GameState, action: GameStateActions) => {
    switch (action.type) {
      case 'status':
        return {...state, status: action.value};
      case 'imagesBuffered':
        return {...state, imagesBuffered: action.value};
      case 'imagesLoaded':
        return {...state, imagesLoaded: action.value};
      case 'isMapVisible':
        return {...state, isMapVisible: action.value};
      default:
        return state;
    } 
  }

  const [gameState, dispatchGameState] = useReducer(gameStateReducer, initialGameStatus);
  
  return (
    <S.Container>
      <GameUI gameState={gameState} 
        gameStateDispatcher={dispatchGameState}/>
      <GameLoop 
        gameState={gameState} 
        gameStateDispatcher={dispatchGameState}/>
    </S.Container>
  );
}

export default App;
