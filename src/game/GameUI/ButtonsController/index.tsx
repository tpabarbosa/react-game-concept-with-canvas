
import { ValidDirections } from '../../types/Directions';
import * as S from './styles';

type Props = {
    onButtonClick: (subtype: string, value: ValidDirections|null) => void;
}

export const ButtonsController = ({onButtonClick}: Props) => {
    
    const handleDirectionsButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        onButtonClick('changeDirections', e.currentTarget.id as ValidDirections);
    }

    const handleGameStateButton = () => {
        onButtonClick('changeState', null);
    }

    return (
        <S.Container>
            <S.DirectionsButtons>
            <div>
                <button id='up' onClick={handleDirectionsButton}>⬆</button>
            </div>
            <div>
                <button id='left' onClick={handleDirectionsButton}>⬅</button>
                <button id='down' onClick={handleDirectionsButton}>⬇</button>
                <button id='right' onClick={handleDirectionsButton}>➡</button>
            </div>
            </S.DirectionsButtons>
            <S.StateButtons>
                <button id={'stateButton'} onClick={handleGameStateButton} >Ação</button>
            </S.StateButtons>
        </S.Container>
    )
}