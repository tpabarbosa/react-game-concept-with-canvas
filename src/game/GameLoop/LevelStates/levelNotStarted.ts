import { GameState } from "../../GameStates/GameState";
import { LevelState } from "../../GameStates/LevelState";
import { LevelStateFuncType, UserInputType } from "./LevelStateFunction";

export const levelNotStarted =  (): LevelStateFuncType => {

    const onUserInput = (input: UserInputType, levelState: LevelState, gameState: GameState) => {
    }

    const onState = (levelState: LevelState, gameState: GameState) => {
        if (!levelState.monsters.isInited) {
            levelState.char.init(levelState.levelToRender);
            levelState.monsters.init(levelState.levelToRender);
            gameState.updateLoadedImages('MAP')
        }

        if (!levelState.items.isInited) {
            levelState.items.init(levelState.levelToRender);
            gameState.updateLoadedImages('NO_IMAGES');
        }

        if(gameState.images === 'MONSTERS') {
            gameState.updateLoadedImages('ALL_IMAGES');
            levelState.transition('FINISH_LOADING_LEVEL')
        } 
    }

    const onEnter = (levelState: LevelState, gameState: GameState) => {
        gameState.audioPlayer.stop('music');
    }


    return { 
        onUserInput,
        onEnter,
        onState
    }
}