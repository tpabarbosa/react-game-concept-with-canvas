import { ValidDirections } from "../../types/Directions";
import { StateProps } from "./StateProps";

export const runningState =  () => {

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps) => {
        if (e.code === 'Enter') {
            return 'PAUSE_COMMAND';
        }
        let direction;
            switch (e.code) {
                case 'KeyA':
                case 'ArrowLeft':
                    direction = 'left';
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    direction = 'right';
                    break;
                case 'KeyS' :
                case 'ArrowDown':
                    direction = 'down';
                    break;
                case 'KeyW':
                case 'ArrowUp' :
                    direction = 'up';
            }
            if (direction as ValidDirections) {
                phaseStatus.char.changeDirection(direction);
            }
    }

    const handleState = ({phaseStatus}: StateProps) => {
        phaseStatus.audioPlayer.stop('clockTicking');
        if(phaseStatus.hasMonsterWin) {
            phaseStatus.updateLives(phaseStatus.lives-1);
            return phaseStatus.lives > 1
                ? 'LIFE_LOST'
                : 'LOST_ALL_LIVES';
        }
        if (phaseStatus.hasCharWin) {
            return 'COLLECTED_ALL_ITEMS';
        }
    }

    return { 
        handleKeyPress,
        handleState
    }
}