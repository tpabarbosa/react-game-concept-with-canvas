import { Actions } from "../../types/GameState";
import { StateProps, UserInputType } from "./StateProps";

export const notStartedState =  () => {

    const handleUserInput = ({input}: UserInputType, phaseStatus: StateProps): Actions | undefined | void => {

    }

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        if (phaseStatus.imagesLoaded==='NO_IMAGES' || 
        phaseStatus.imagesLoaded==='MAP') {
            phaseStatus.stopLoopTimers();
            phaseStatus.items.init();
            phaseStatus.char.init();
            phaseStatus.monsters.init();
            phaseStatus.setIsCharUpdateRequired(true);
            phaseStatus.setIsMonstersUpdateRequired(true);
            phaseStatus.setIsItemsUpdateRequired(true);
            phaseStatus.audioPlayer.stop('music');
            return 'IMAGES_LOADED';
        };
    }

    return { 
        handleUserInput,
        handleState
    }
}