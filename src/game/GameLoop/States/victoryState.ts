import { phases } from "../../constants/phases";
import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const victoryState =  () => {
    
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
        handleKeyPress,
        handleState
    }
}