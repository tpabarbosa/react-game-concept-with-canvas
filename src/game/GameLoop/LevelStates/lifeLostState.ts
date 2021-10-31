import { GameState } from "../../AppStates/GameState";
import { LevelState } from "../../AppStates/LevelState";
import { LevelStateFuncType, UserInputType } from "./LevelStateFunction";

export const lifeLostState  =  (): LevelStateFuncType => {

    const onUserInput = (input:UserInputType, levelState:LevelState, gameState:GameState) => {
        
        if (input.type==='keypress' && input.value.code === 'Enter') {
            changeState(levelState, gameState);
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            changeState(levelState, gameState);
        }
    }

    const changeState = (levelState:LevelState, gameState:GameState) => {
        levelState.transition('FINISH_RELOADING_LEVEL');

    }

    const onState = (levelState:LevelState, gameState:GameState) => {

    }

    const onEnter = (levelState:LevelState, gameState:GameState) => {
        gameState.audioPlayer.stop('music');
        gameState.audioPlayer.play('defeated');
        gameState.updateLives(gameState.lives-1);
        levelState.monsters.clean();
    }

    return { 
        onUserInput,
        onState,
        onEnter
    }
}