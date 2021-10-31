import { GameState } from "../../AppStates/GameState";
import { LevelState } from "../../AppStates/LevelState";
import { LevelStateFuncType, UserInputType } from "./LevelStateFunction";

export const levelIdleState  =  (): LevelStateFuncType => {

    const onUserInput = (input:UserInputType, levelState: LevelState, gameState: GameState) => {
        if (input.type==='keypress' && input.value.code==='Enter') {
            levelState.transition('START_RUNNING_COMMAND')
        }
        if (input.type==='buttonclick' && input.subtype==='changeState') {
            levelState.transition('START_RUNNING_COMMAND')
        }
    }

    const onState = (levelState: LevelState, gameState: GameState) => {
    }

    const onEnter = (levelState: LevelState, gameState: GameState) => {
    }

    return { 
        onUserInput,
        onState,
        onEnter
    }
}