import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const defeatedState =  () => {

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
        handleKeyPress,
        handleState
    }
}