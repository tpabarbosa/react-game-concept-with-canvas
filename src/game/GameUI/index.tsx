import * as S from './styles';
import { GameState } from '../types/GameState';
import { Stats } from './Stats';

type Props = {
    counterDown: any;
    gameState: GameState;
}

export const GameUI = ({ counterDown, gameState }: Props) => {

    // const counterDown = useCounterDown({initial: 3});

    // useEffect(()=>{
    //     if(gameState.status === 'STARTED' && !counterDown.isCounting) {
    //         gameStateDispatcher({type: 'status', value: 'COUNTING_DOWN'});
    //         counterDown.start();
    //     }
    //     if(gameState.status ==='COUNTING_DOWN' && counterDown.count===0) {
    //         gameStateDispatcher({type: 'status', value: 'RUNNING'});
    //     }
            
    // }, [gameState.status, counterDown, gameStateDispatcher]);


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
            <Stats phase={gameState.phase.showingPhase} lives={gameState.lives} mustClean={gameState.status==='NOT_STARTED'} mustRender={gameState.status==='NOT_STARTED'}/>
        </S.Container>

        
        </>
    )
}