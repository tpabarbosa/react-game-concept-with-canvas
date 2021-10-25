import { StateProps } from "./StateProps";

export const startedState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps) => {

    }

    const handleState = ({phaseStatus}: StateProps) => {
        if(!phaseStatus.counterDown.isCounting) {
            phaseStatus.counterDown.start();
            phaseStatus.audioPlayer.playLoop('clockTicking');
            return 'BEGIN_COUNTING_DOWN';
        } 
    }

    return { 
        handleKeyPress,
        handleState
    }
}