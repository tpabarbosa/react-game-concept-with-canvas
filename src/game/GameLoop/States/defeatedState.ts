import { StateProps } from "./StateProps";

export const defeatedState =  () => {
    let playAudio= true;

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps) => {
        if (e.code === 'Enter') {
            phaseStatus.updateLives(3);
            phaseStatus.updatePhase(1, 1);
            playAudio=true;
            return 'NEW_GAME_COMMAND';
        }
    }

    const handleState = ({phaseStatus}: StateProps) => {
        if (playAudio) {
            phaseStatus.audioPlayer.play('defeated');
            phaseStatus.audioPlayer.stop('music');
            playAudio = false;
        }
    }

    return { 
        handleKeyPress,
        handleState
    }
}