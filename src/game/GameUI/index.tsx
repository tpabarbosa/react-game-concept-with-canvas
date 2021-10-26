import * as S from './styles';
import { GameState } from '../types/GameState';
import { Stats } from './Stats';
import { AudioController } from './AudioController';
import { ButtonsController } from './ButtonsController';
import { ValidDirections } from '../types/Directions';

type Props = {
    counterDown: any;
    gameState: GameState;
    audioPlayer: any;
    onButtonClick: (subtype: string, value: ValidDirections|null) => void;
}

export const GameUI = ({ onButtonClick, counterDown, gameState, audioPlayer }: Props) => {

    return (
        
        <>
        <S.Container>
            <S.MapArea>
            {gameState.status==='COUNTING_DOWN' &&
                <S.CounterDown>
                    <div>{counterDown.count}</div>
                </S.CounterDown>
            }

            {gameState.status==='DEFEATED' &&
                <S.Info color={'red'}>
                    <div>Você Perdeu</div>
                    <div>😭</div> 
                </S.Info>
            }

            {gameState.status ==='VICTORY' &&
                <S.Info color={'green'}>
                    <div>Você Ganhou</div>
                    <div>🤣</div> 
                </S.Info>
            }

            {gameState.status ==='LIFE_LOST' &&
                <S.Info color={'pink'}>
                    <div>Você Perdeu uma vida</div>
                    <div>😥</div> 
                </S.Info>
            }       

            {gameState.status === 'PAUSED' &&
                <S.Info color={'cyan'}>
                    <div>PAUSA</div>
                    <div>✋🛑</div> 
                </S.Info>
            }
            </S.MapArea>
            <Stats phase={gameState.phase.showingPhase} lives={gameState.lives} mustClean={gameState.status==='NOT_STARTED'} mustRender={gameState.status==='NOT_STARTED'} totalCollected={gameState.totalCollected}>
            <ButtonsController onButtonClick={onButtonClick}/>
            </Stats>
            <AudioController audioPlayer={audioPlayer} />
           
        </S.Container>
        
        
        </>
    )
}