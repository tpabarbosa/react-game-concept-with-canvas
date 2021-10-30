import { GameState } from "../../GameStates/GameState";
import { LevelState } from "../../GameStates/LevelState";
import { LevelStateFuncType, UserInputType } from "./LevelStateFunction";

export const pausedState  =  (): LevelStateFuncType => {

    const onUserInput = (input:UserInputType, levelState:LevelState, gameState:GameState) => {
        if (input.type==='keypress' && input.value.code === 'Enter') {
            changeState(levelState, gameState);
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            changeState(levelState, gameState);
        }
    }

    const changeState = (levelState:LevelState, gameState:GameState) => {
        gameState.audioPlayer.playLoop('music');
        gameState.audioPlayer.stop('clockTicking');
        levelState.transition('UNPAUSE_COMMAND');
    }


    const onState = (levelState:LevelState, gameState:GameState) => {
        
    }

    const onEnter = (levelState:LevelState, gameState:GameState) => {
        gameState.audioPlayer.pause('music');
        gameState.audioPlayer.playLoop('clockTicking');
    }

    return { 
        onUserInput,
        onState,
        onEnter
    }
}