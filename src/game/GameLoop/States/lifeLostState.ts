import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const lifeLostState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {
        if (e.code === 'Enter') {
            return 'REINITIALIZE_COMMAND';
        }
    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        //phaseStatus.audioPlayer.stop('music');
    }

    return { 
        handleKeyPress,
        handleState
    }
}