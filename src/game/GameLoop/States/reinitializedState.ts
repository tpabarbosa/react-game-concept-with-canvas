import { Actions } from "../../types/GameState";
import { StateProps, UserInputType } from "./StateProps";

export const reinitializedState =  () => {

    const handleUserInput = ({input}: UserInputType, phaseStatus: StateProps): Actions | undefined | void => {
        
    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        phaseStatus.stopLoopTimers();
        phaseStatus.char.init();
        phaseStatus.monsters.init();
        phaseStatus.setIsUpdateRequired(true);
        return 'INITIALIZED';
    }

    return { 
        handleUserInput,
        handleState
    }
}