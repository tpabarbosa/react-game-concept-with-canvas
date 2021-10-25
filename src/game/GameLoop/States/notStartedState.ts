import { StateProps } from "./StateProps";

export const notStartedState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps) => {
        
    }

    const handleState = ({phaseStatus}: StateProps) => {
        if (phaseStatus.imagesLoaded==='ALL_IMAGES' || 
        phaseStatus.imagesLoaded==='MONSTERS') {
            phaseStatus.stopLoopTimers();
            phaseStatus.items.init();
            phaseStatus.char.init();
            phaseStatus.monsters.init();
            phaseStatus.audioPlayer.stop('music');
            phaseStatus.setIsUpdateRequired(true);
            return 'IMAGES_LOADED';
        };
    }

    return { 
        handleKeyPress,
        handleState
    }
}