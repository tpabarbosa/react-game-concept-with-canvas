import { StateProps } from "./StateProps";

export const pausedState =  () => {

    const handleKeyPress = (e: KeyboardEvent, {phaseStatus}: StateProps) => {
        if (e.code === 'Enter') {
            phaseStatus.audioPlayer.playLoop('music');
            phaseStatus.stopLoopTimers();
            return 'UNPAUSE_COMMAND';
        }
    }

    const handleState = ({phaseStatus}: StateProps) => {
        phaseStatus.audioPlayer.pause('music');
        phaseStatus.audioPlayer.playLoop('clockTicking');
    }

    return { 
        handleKeyPress,
        handleState
    }
}