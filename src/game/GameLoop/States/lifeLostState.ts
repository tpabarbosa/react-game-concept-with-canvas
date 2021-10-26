import { Actions } from "../../types/GameState";
import { StateProps, UserInputType } from "./StateProps";

export const lifeLostState =  () => {

    const handleUserInput = ({input}: UserInputType, phaseStatus: StateProps): Actions | undefined | void => {
        if (input.type==='keypress') {
            return handleKeyPress(input.value, phaseStatus);
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            return handleChangeState(phaseStatus);
        }
    }

    const handleChangeState = ({phaseStatus}: StateProps) => {
        return 'REINITIALIZE_COMMAND' as Actions;
    }

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {
        if (e.code === 'Enter') {
            return 'REINITIALIZE_COMMAND';
        }
    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        //phaseStatus.audioPlayer.stop('music');
    }

    return { 
        handleUserInput,
        handleState
    }
}