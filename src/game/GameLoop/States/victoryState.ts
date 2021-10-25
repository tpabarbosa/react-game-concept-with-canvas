import { phases } from "../../constants/phases";
import { StateProps } from "./StateProps";

export const victoryState =  () => {
    let playAudio = true;
    
    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps) => {

        if (e.code === 'Enter') {
            const toLoad = phaseStatus.showingPhase === Object.keys(phases).length ? Object.keys(phases).length : phaseStatus.showingPhase+1;
            phaseStatus.updatePhase(phaseStatus.showingPhase+1, toLoad);
            playAudio = true;
            return 'NEW_GAME_COMMAND';
        }
    }

    const handleState = ({phaseStatus}: StateProps) => {
        if(playAudio) {
            phaseStatus.audioPlayer.play('victory');
            phaseStatus.audioPlayer.stop('music');
            playAudio = false;
        } 
    }

    return { 
        handleKeyPress,
        handleState
    }
}