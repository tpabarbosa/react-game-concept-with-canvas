import { useState } from 'react';
import * as S from './styles';

type Props = {
    audioPlayer: any
}

export const AudioButton = ({audioPlayer}: Props) => {
    const [muted, setMuted] = useState(false);

    const handleChangeMute = () => {
        audioPlayer.setMuted(!muted)
        setMuted(!muted);
    }

    return (
        <S.Container>
            {!muted && <button onClick={handleChangeMute}>🔊</button>}
            {muted && <button onClick={handleChangeMute}>🔈</button>}
            
        </S.Container>
    )
}