import { phases } from "../../constants/phases";
import { Actions } from "../../types/GameState";
import { StateProps, UserInputType } from "./StateProps";

export const victoryState =  () => {
    
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

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {

        if (e.code === 'Enter') {
            const toLoad = phaseStatus.showingPhase >= Object.keys(phases).length ? Object.keys(phases).length : phaseStatus.showingPhase+1;
            phaseStatus.updatePhase(phaseStatus.showingPhase+1, toLoad);
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