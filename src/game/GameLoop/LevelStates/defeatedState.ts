import { GameState } from "../../AppStates/GameState";
import { LevelState } from "../../AppStates/LevelState";
import {  LevelStateFuncType, UserInputType } from "./LevelStateFunction";

export const defeatedState =  (): LevelStateFuncType => {

    const onUserInput = (input:UserInputType, levelState:LevelState, gameState:GameState) => {
        if (input.type==='keypress' && input.value.code === 'Enter') {
            changeState(levelState, gameState);
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            changeState(levelState, gameState);
        }
    }

    const changeState = (levelState:LevelState, gameState:GameState) => {
        levelState.updateLevelToRender(1);
        gameState.updateLevel(1);
        gameState.updateLives(3);
        gameState.updatePoints(0);
        levelState.transition('END_LEVEL');
        
    }

    const onState = (levelState:LevelState, gameState:GameState) => {
        
        
    }

    const onEnter = (levelState:LevelState, gameState:GameState) => {
        gameState.audioPlayer.play('defeated');
        gameState.audioPlayer.stop('music');
        gameState.updateLives(gameState.lives-1);
        levelState.items.clean();
        levelState.monsters.clean();
    }

    return { 
        onUserInput,
        onState,
        onEnter,
    }
}