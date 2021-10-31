
import { ValidDirections } from '../../helpers/PositionAndDirection/DirectionsType';
import * as S from './styles';

type Props = {
    onButtonClick: (subtype: string, value: ValidDirections|null) => void;
}

export const GameButtons = ({onButtonClick}: Props) => {
    
    const handleDirectionsButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        onButtonClick('changeDirections', e.currentTarget.id as ValidDirections);
    }

    const handleGameStateButton = () => {
        onButtonClick('changeState', null);
    }

    return (
        <>
        <S.Background />
        <S.Container>
            
            
            <S.StateButtons>
                <div>
                <button id={'stateButton'} onClick={handleGameStateButton} >Ação</button>
                </div>
            </S.StateButtons>
            <S.DirectionsButtons>
            
            <div>
                <button id='left' onClick={handleDirectionsButton}>⬅</button>
            </div>
            <div>
                <button id='up' onClick={handleDirectionsButton}>⬆</button>
                <button id='down' onClick={handleDirectionsButton}>⬇</button>
            </div>
            <div>
                <button id='right' onClick={handleDirectionsButton}>➡</button>
            </div>
            </S.DirectionsButtons>
            
        </S.Container>
        </>
    )
}