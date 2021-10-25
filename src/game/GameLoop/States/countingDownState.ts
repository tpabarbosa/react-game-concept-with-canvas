import { Actions } from "../../types/GameState";
import { StateProps, StateType } from "./StateProps";

export const countingDownState: StateType =  () => {

    const handleKeyPress = (e: KeyboardEvent, {phaseStatus}: StateProps): Actions | undefined | void => {

    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
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