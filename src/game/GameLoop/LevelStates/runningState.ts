import { ValidDirections } from "../../helpers/PositionAndDirection/DirectionsType";
import { GameState } from "../../GameStates/GameState";
import { LevelState } from "../../GameStates/LevelState";
import { LevelStateFuncType, UserInputType } from "./LevelStateFunction";

export const runningState  =  (): LevelStateFuncType => {

    const onUserInput = (input:UserInputType,levelState:LevelState, gameState:GameState) => {
        if (input.type==='keypress') {
            onKeyPress(input.value, levelState, gameState);
        }
        if (input.type==='buttonclick') {
            onButtonClick(input.subtype, input.value, levelState, gameState)
        }
    }

    const onButtonClick = (subtype:string, value: ValidDirections | null, levelState:LevelState, gameState:GameState) => {
        if (subtype === 'changeDirections' && value) {
            levelState.char.changeDirection(value);
        }
        if (subtype === 'changeState') {
            levelState.transition('PAUSE_COMMAND');
        }
    }

    const onKeyPress = (e: KeyboardEvent, levelState:LevelState, gameState:GameState) => {
        e.preventDefault();
        if (e.code === 'Enter') {
            levelState.transition('PAUSE_COMMAND');
        }
        let direction: ValidDirections|undefined =undefined;
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
        if (direction) {
            levelState.char.changeDirection(direction);
        }
    }

    const onState = (levelState:LevelState, gameState:GameState) => {
        if (levelState.monsters.changedChasingMode) {
            gameState.audioPlayer.play('chasing');
        }

        if(levelState.monsters.updateRequired) {
            if (levelState.monsters.isCloseToChar()) {
                gameState.audioPlayer.play('monster');
            }
        }
    
        if (levelState.items.updateRequired) {
            if (levelState.items.points) {
                gameState.updatePoints(levelState.items.points + gameState.points);
                gameState.audioPlayer.play('coinCollected');
            }
            levelState.items.checkCollected(levelState.char.position);
            if (levelState.items.checkCollectedAll()) {
                levelState.transition('LEVEL_WON');
                return
            }
        }

        if (levelState.char.updateRequired || levelState.monsters.updateRequired) {
            if(levelState.monsters.checkCollision()) {
                gameState.lives > 1
                    ? levelState.transition('LOST_A_LIFE')
                    : levelState.transition('LEVEL_LOST');
                return
            }
        }
    }

    const onEnter = (levelState:LevelState, gameState:GameState) => {
        gameState.audioPlayer.playLoop('music');
    }

    return { 
        onUserInput,
        onState,
        onEnter
    }
}