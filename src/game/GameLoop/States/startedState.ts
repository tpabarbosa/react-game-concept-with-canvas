import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const startedState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {

    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        if(!phaseStatus.counterDown.isCounting) {
            phaseStatus.counterDown.start();
            phaseStatus.audioPlayer.playLoop('clockTicking');
            return 'BEGIN_COUNTING_DOWN' as Actions;
        } 
    }

    return { 
        handleKeyPress,
        handleState
    }
}