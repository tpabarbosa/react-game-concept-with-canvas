import { Actions } from "../../types/GameState";
import { StateProps, UserInputType } from "./StateProps";

export const defeatedState =  () => {

    const handleUserInput = ({input}: UserInputType, phaseStatus: StateProps): Actions | undefined | void => {
        if (input.type==='keypress') {
            return handleKeyPress(input.value, phaseStatus);
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            return handleChangeState(phaseStatus);
        }
    }

    const handleChangeState = ({phaseStatus}: StateProps) => {
            phaseStatus.updateLives(3);
            phaseStatus.updatePhase(1, 1);
            phaseStatus.updateCollected(0);
            return 'NEW_GAME_COMMAND' as Actions;
    }

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {
        if (e.code === 'Enter') {
            phaseStatus.updateLives(3);
            phaseStatus.updatePhase(1, 1);
            phaseStatus.updateCollected(0);
            return 'NEW_GAME_COMMAND';
        }
    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        phaseStatus.audioPlayer.stop('music');
    }

    return { 
        handleUserInput,
        handleState
    }
}