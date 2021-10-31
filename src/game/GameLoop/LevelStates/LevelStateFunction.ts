import { ValidDirections } from "../../helpers/PositionAndDirection/DirectionsType";
import { GameState } from "../../AppStates/GameState";
import { LevelState, LevelStatus } from "../../AppStates/LevelState";

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