import { useReducer } from 'react';
import * as S from './styles';
import { GameState, GameStateActions } from './types/GameState';
import { GameUI } from './GameUI';
import { GameLoop } from './GameLoop';
import { useCounterDown } from '../hooks/useCounterDown';

const App = () => {
  const initialGameStatus: GameState = {
    lives: 3,
    phase: {showingPhase: 1, loadingPhase: 1},
    imagesBuffered: 'NO_IMAGES',
    imagesLoaded: 'NO_IMAGES',
    status: 'NOT_STARTED',
    isMapVisible: false,
  };

  const gameStateReducer = (state: GameState, action: GameStateActions) => {
    switch (action.type) {
      case 'status':
        return {...state, status: action.value};
      case 'phase':
        return {...state, phase: action.value};
      case 'lives':
        return {...state, lives: action.value};
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

  const counterDown = useCounterDown({initial: 3});

  const [gameState, dispatchGameState] = useReducer(gameStateReducer, initialGameStatus);
  
  return (
    <S.Container>
      <GameUI gameState={gameState} 
        counterDown={counterDown}/>
      <GameLoop 
        gameState={gameState} 
        gameStateDispatcher={dispatchGameState}
        counterDown={counterDown}/>
    </S.Container>
  );
}

export default App;
