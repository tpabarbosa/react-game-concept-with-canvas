import { GameState } from "../../AppStates/GameState";
import { LevelState } from "../../AppStates/LevelState";
import { LevelStateFuncType, UserInputType } from "./LevelStateFunction";

export const countingDownState =  (): LevelStateFuncType => {

    const onUserInput = (input:UserInputType,levelState:LevelState, gameState:GameState) => {

    }

    const onState = (levelState:LevelState, gameState:GameState) => {
        if (gameState.counterDown.count === 0 && gameState.counterDown.isCounting) {
            gameState.audioPlayer.stop('clockTicking');
            levelState.transition('FINISH_COUNTING_DOWN');
        }
    }

    const onEnter = (levelState:LevelState, gameState:GameState) => {
        gameState.counterDown.start(3);
        gameState.audioPlayer.play('clockTicking');
    }

    return { 
        onUserInput,
        onState,
        onEnter,
    }
}