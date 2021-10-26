import { ValidDirections } from "../../types/Directions";
import { Actions } from "../../types/GameState";
import { StateProps, StateType, UserInputType } from "./StateProps";

export const runningState:StateType =  () => {

    const handleUserInput = ({input}: UserInputType, phaseStatus: StateProps) => {
        if (input.type==='keypress') {
            return handleKeyPress(input.value, phaseStatus)
        }
        if (input.type==='buttonclick') {
            return handleButtonClick(input.subtype, input.value, phaseStatus)
        }
    }

    const handleButtonClick = (subtype:string, value: ValidDirections | null, {phaseStatus}: StateProps) => {
        if (subtype === 'changeDirections') {
            
            phaseStatus.char.changeDirection(value);
            return
        }
        if (subtype === 'changeState') {
            return 'PAUSE_COMMAND';
        }
    }

    const handleKeyPress = (e: KeyboardEvent,{phaseStatus}: StateProps): Actions | undefined | void => {
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

    const handleState = ({phaseStatus}: StateProps): Actions | undefined | void => {
        phaseStatus.audioPlayer.stop('clockTicking');
        if(phaseStatus.hasMonsterWin) {
            phaseStatus.updateLives(phaseStatus.lives-1);
            phaseStatus.audioPlayer.play('defeated');
            return phaseStatus.lives > 1
                ? 'LIFE_LOST'
                : 'LOST_ALL_LIVES';
        }
        if (phaseStatus.hasCharWin) {
            phaseStatus.audioPlayer.play('victory');
            return 'COLLECTED_ALL_ITEMS';
        }
        
        if (phaseStatus.monsters.isCloseToChar()) {
            phaseStatus.audioPlayer.play('monster');
        }
    
        if (phaseStatus.monsters.changedChasingMode) {
            phaseStatus.audioPlayer.play('chasing');
        }
        
    }

    return { 
        handleUserInput,
        handleState
    }
}