import { Actions } from "../../types/GameState";
import { StateProps, UserInputType } from "./StateProps";

export const initializedState =  () => {

    const handleUserInput = ({input}: UserInputType, phaseStatus: StateProps): Actions | undefined | void => {
        
        if (input.type==='keypress') {
            return handleKeyPress(input.value, phaseStatus);
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            return handleChangeState(phaseStatus);
        }
    }

    const handleChangeState = ({phaseStatus}: StateProps) => {
        phaseStatus.setHasMonsterWin(false);
        phaseStatus.setHasCharWin(false);
        return 'START_COMMAND' as Actions;
    }

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {
        
        if (e.code === 'Enter') {
            phaseStatus.setHasMonsterWin(false);
            phaseStatus.setHasCharWin(false);
            return 'START_COMMAND';
        }
        return;
    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
    }

    return { 
        handleUserInput,
        handleState
    }
}