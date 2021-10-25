import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const reinitializedState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {

    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        phaseStatus.stopLoopTimers();
        phaseStatus.char.init();
        phaseStatus.monsters.init();
        phaseStatus.setIsUpdateRequired(true);
        return 'INITIALIZED';
    }

    return { 
        handleKeyPress,
        handleState
    }
}