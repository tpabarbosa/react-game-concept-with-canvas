import { StateProps } from "./StateProps";

export const initializedState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps) => {
        if (e.code === 'Enter') {
            phaseStatus.setHasMonsterWin(false);
            phaseStatus.setHasCharWin(false);
            return 'START_COMMAND';
        }
        return;
    }

    const handleState = ({phaseStatus}: StateProps) => {
    }

    return { 
        handleKeyPress,
        handleState
    }
}