import { StateProps } from "./StateProps";

export const reinitializedState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps) => {

    }

    const handleState = ({phaseStatus}: StateProps) => {
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