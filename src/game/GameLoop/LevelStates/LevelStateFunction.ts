import { ValidDirections } from "../../helpers/PositionAndDirection/DirectionsType";
import { GameState } from "../../GameStates/GameState";
import { LevelState, LevelStatus } from "../../GameStates/LevelState";

export type LevelStatesType = {
    [state in LevelStatus]:() =>  LevelStateFuncType;
  }

export type UserInputType = 
    {type: 'keypress', value:KeyboardEvent} | 
    {type:'buttonclick', subtype:string, value: ValidDirections | null} ;

  export type LevelStateFuncType = {
        onUserInput: (input:UserInputType,levelState:LevelState, gameState:GameState) =>  void;
        onEnter: (levelState:LevelState, gameState:GameState) => void;
        onState: (levelState:LevelState, gameState:GameState) => void;
}