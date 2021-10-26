import { Actions } from "../../types/GameState";
import { StateProps, UserInputType } from "./StateProps";

export const startedState =  () => {

    const handleUserInput = ({input}: UserInputType, phaseStatus: StateProps): Actions | undefined | void => {
        
    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        if(!phaseStatus.counterDown.isCounting) {
            phaseStatus.counterDown.start();
            phaseStatus.audioPlayer.playLoop('clockTicking');
            return 'BEGIN_COUNTING_DOWN' as Actions;
        } 
    }

    return { 
        handleUserInput,
        handleState
    }
}