import { levels } from "../../GameData/levelsData";
import { GameState } from "../../GameStates/GameState";
import { LevelState } from "../../GameStates/LevelState";
import { LevelStateFuncType, UserInputType } from "./LevelStateFunction";

export const victoryState  =  (): LevelStateFuncType => {
    
    const onUserInput = (input:UserInputType, levelState:LevelState, gameState:GameState) => {
        if (input.type==='keypress' && input.value.code === 'Enter') {
            changeState(levelState, gameState);
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            changeState(levelState, gameState);
        }
    }

    const changeState = (levelState:LevelState, gameState:GameState) => {
        levelState.transition('END_LEVEL');
    }

    const onState = (levelState:LevelState, gameState:GameState) => {
    }

    const onEnter = (levelState:LevelState, gameState:GameState) => {
        const toLoad = gameState.level + 1 >= Object.keys(levels).length ? Object.keys(levels).length : gameState.level+1;

        gameState.updateLevel(gameState.level + 1);
        levelState.updateLevelToRender(toLoad);
        gameState.audioPlayer.stop('music');
        gameState.audioPlayer.play('victory');
        levelState.items.clean();
        levelState.monsters.clean();
    }

    return { 
        onUserInput,
        onState,
        onEnter
    }
}