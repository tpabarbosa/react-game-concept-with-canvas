import { Actions } from "../../types/GameState";
import { StateProps } from "./StateProps";

export const notStartedState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {
        
    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
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