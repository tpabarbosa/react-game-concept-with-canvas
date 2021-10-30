import { useCallback, useEffect, useReducer, useState } from 'react';
import * as S from './styles';
import { GameUI } from './GameUI';
import { GameLoop } from './GameLoop';
import { ValidDirections } from './helpers/PositionAndDirection/DirectionsType';
import { AppActions, AppState, AppStateProperties, appStatusTransitions } from './AppState';
import { ImagesBuffering } from './ImagesBuffering';
import { useGameState } from './GameStates/useGameState';
import { useLevelState } from './GameStates/useLevelState';

const App = () => {
  const initialAppState: AppState = {
    status: 'APP_STARTED',
  }

  

  const appStateReducer = (state: AppState, property: AppStateProperties) => {
    switch (property.prop) {
      case 'status':
        return {...state, status: property.value};
      default:
        return state;
    }
  }

  const [appState, updateAppState] = useReducer(appStateReducer, initialAppState);

  const appTransition = useCallback((action: AppActions | void) => {
    const newStatus = action ? appStatusTransitions[appState.status][action]: undefined;
    if (newStatus) {
      updateAppState({prop: 'status', value: newStatus});
    }
  },[appState.status])

  
  const levelState = useLevelState();
  const gameState = useGameState();

  const [userLastInput, setUserLastInput] = useState<{subtype: string, value:ValidDirections|null}|null>(null);

  const handleButtonClick = (subtype: string, value: ValidDirections|null) => {
    setUserLastInput({subtype: subtype, value:value});
  }

  const onHandledButtonClick = () => {
    setUserLastInput(null);
  } 

  const handleGameStartCommand = () => {
    appTransition('NEW_GAME_COMMAND');
    //gameState.setChar(1, 'Player Name');
    gameState.transition('NEW_GAME_COMMAND');
    //levelState.transition('NEW_LEVEL_COMMAND');
  }
  
  useEffect(() => {
    if(appState.status==='APP_IDLE') {
      appTransition('NEW_GAME_COMMAND');
      gameState.transition('NEW_GAME_COMMAND');
    }
  }, [appState.status, gameState, appTransition])

  return (
    <S.Container>

        <ImagesBuffering appTransition={appTransition}/>


      {appState.status==='APP_IDLE' &&
        <button onClick={handleGameStartCommand}> Iniciar Jogo</button>
      }

      {appState.status==='GAME_STARTED' &&
        <>
          <GameUI 
            onButtonClick={handleButtonClick}
            gameState={gameState} 
            levelState={levelState}
          />
          <GameLoop 
            userLastInput={userLastInput}
            onButtonClick={onHandledButtonClick}
            gameState={gameState} 
            levelState={levelState}
          />
        </>
      }
    </S.Container>
  );
}

export default App;
