import { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import { GameUI } from './GameUI';
import { GameLoop } from './GameLoop';
import { ValidDirections } from './helpers/PositionAndDirection/DirectionsType';
import { ImagesBuffering } from './ImagesBuffering';
import { useAppState } from './AppStates/useAppState';

const App = () => {
  
  const {appState, gameState, levelState, appTransition} = useAppState();

  const [userLastInput, setUserLastInput] = useState<{subtype: string, value:ValidDirections|null}|null>(null);

  const handleButtonClick = (subtype: string, value: ValidDirections|null) => {
    setUserLastInput({subtype: subtype, value:value});
  }

  const onHandledButtonClick = () => {
    setUserLastInput(null);
  } 

  const handleGameStartCommand = useCallback(() => {
    appTransition('NEW_GAME_COMMAND');
    gameState.transition('NEW_GAME_COMMAND');
  },[appTransition, gameState])
  
  useEffect(() => {
    if(appState.status==='APP_IDLE') {
      handleGameStartCommand()
    }
  }, [appState.status, gameState, appTransition, handleGameStartCommand])

  return (
    <>
    <S. GlobalStyle />
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
    </>
  );
}

export default App;
