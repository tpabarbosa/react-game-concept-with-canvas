import { StateProps } from "./StateProps";

export const lifeLostState =  () => {
    let playAudio= true;

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps) => {
        if (e.code === 'Enter') {
            playAudio = true;
            return 'REINITIALIZE_COMMAND';
        }
    }

    const handleState = ({phaseStatus}: StateProps) => {
        if (playAudio) {
            phaseStatus.audioPlayer.play('defeated');
            playAudio = false;
        }
        
    }

    return { 
        handleKeyPress,
        handleState
    }
}