import * as S from './styles';
import { GameState } from '../AppStates/GameState';
import { GameStats } from './GameStats';
import { AudioButton } from './AudioButton';
import { GameButtons} from './GameButtons';
import { ValidDirections } from '../helpers/PositionAndDirection/DirectionsType';
import { LevelState } from '../AppStates/LevelState';

type Props = {
    gameState: GameState;
    levelState: LevelState;
    onButtonClick: (subtype: string, value: ValidDirections|null) => void;
}

export const GameUI = ({ levelState, onButtonClick, gameState}: Props) => {

    return (
        
        <>
        <S.Container>
            
            <S.MapArea>
            {levelState.status==='COUNTING_DOWN' &&
                <S.CounterDown>
                    <div>{gameState.counterDown.count}</div>
                </S.CounterDown>
            }

            {levelState.status ==='DEFEATED_LEVEL_ENDED' &&
                <S.Info color={'red'}>
                    <div>Você Perdeu</div>
                    <div>😭</div> 
                </S.Info>
            }

            {levelState.status ==='VICTORY_LEVEL_ENDED' &&
                <S.Info color={'green'}>
                    <div>Você Ganhou</div>
                    <div>🤣</div> 
                </S.Info>
            }

            {levelState.status ==='LIFE_LOST' &&
                <S.Info color={'pink'}>
                    <div>Você Perdeu uma vida</div>
                    <div>😥</div> 
                </S.Info>
            }       

            {levelState.status === 'PAUSED' &&
                <S.Info color={'cyan'}>
                    <div>PAUSA</div>
                    <div>✋🛑</div> 
                </S.Info>
            }
            </S.MapArea>

            <GameStats level={gameState.level} lives={gameState.lives} mustClean={levelState.status==='LEVEL_NOT_STARTED'} mustRender={levelState.status==='LEVEL_IDLE'} totalCollected={gameState.points} />

            <GameButtons onButtonClick={onButtonClick}/>
            
            <AudioButton audioPlayer={gameState.audioPlayer} />
        
        </S.Container>
        
        
        </>
    )
}