import * as S from './styles';

type Props = {
    gameStartCommand: () => void;
}

export const GameStartScreen = ({gameStartCommand}: Props) => {
    return (
        <S.Container>
            <button onClick={gameStartCommand}> Iniciar Jogo</button>
        </S.Container>
    )
}