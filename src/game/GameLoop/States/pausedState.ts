import { Actions } from "../../types/GameState";
import { StateProps, UserInputType } from "./StateProps";

export const pausedState =  () => {

    const handleUserInput = ({input}: UserInputType, phaseStatus: StateProps): Actions | undefined | void => {
        if (input.type==='keypress') {
            return handleKeyPress(input.value, phaseStatus);
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            return handleChangeState(phaseStatus);
        }
    }

    const handleChangeState = ({phaseStatus}: StateProps) => {
        phaseStatus.audioPlayer.playLoop('music');
            phaseStatus.stopLoopTimers();
            return 'UNPAUSE_COMMAND' as Actions;
    }

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
        handleUserInput,
        handleState
    }
}