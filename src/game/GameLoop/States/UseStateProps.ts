import { Actions, GameState } from "../../types/GameState";

export type UseStateProps = {
    transition: (action: Actions, update?:boolean) => void;
    gameState: GameState;
}