import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const countingDownState =  () => {

    const handleKeyPress = (e: KeyboardEvent, {phaseStatus}: StateProps) => {

    }

    const handleState = ({phaseStatus}: StateProps) => {
        if (phaseStatus.counterDown.count === 0 ) {
            phaseStatus.audioPlayer.stop('clockTicking');
            phaseStatus.audioPlayer.playLoop('music');
            return 'FINISH_COUNTING_DOWN' as Actions;
        }
    }

    return { 
        handleKeyPress,
        handleState
    }
}