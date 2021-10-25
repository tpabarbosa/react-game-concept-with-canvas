import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const initializedState =  () => {

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
        handleKeyPress,
        handleState
    }
}