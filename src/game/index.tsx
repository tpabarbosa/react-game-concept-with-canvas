import { useCallback, useState } from 'react';
import * as S from './styles';
import { GameUI } from './GameUI';
import { GameLoop } from './GameLoop';
import { ValidDirections } from './helpers/PositionAndDirection/DirectionsType';
import { ImagesBuffering } from './ImagesBuffering';
import { useAppState } from './AppStates/useAppState';
import { GameStartScreen } from './GameStartScreen';

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
  

  return (
    <>
    <S. GlobalStyle />
    <S.Container>

      <ImagesBuffering appTransition={appTransition}/>

      {appState.status==='APP_IDLE' &&
        <GameStartScreen gameStartCommand={handleGameStartCommand}/>
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
