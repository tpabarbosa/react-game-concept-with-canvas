import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const pausedState =  () => {

    const handleKeyPress = (e: KeyboardEvent, {phaseStatus}: StateProps): Actions | undefined | void => {
        if (e.code === 'Enter') {
            phaseStatus.audioPlayer.playLoop('music');
            phaseStatus.stopLoopTimers();
            return 'UNPAUSE_COMMAND';
        }
    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        phaseStatus.audioPlayer.pause('music');
        phaseStatus.audioPlayer.playLoop('clockTicking');
    }

    return { 
        handleKeyPress,
        handleState
    }
}