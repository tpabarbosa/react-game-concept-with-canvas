import { useCallback, useMemo, useReducer } from "react";
import { useCharacter } from "../GameEntities/useCharacter";
import { useItems } from "../GameEntities/useItems";
import { useMonsters } from "../GameEntities/useMonsters";
import { InternalLevelState, LevelActions, LevelState, LevelStateProperties, levelTransitions } from "./LevelState";

export const useLevelState = () => {

    const initialState: InternalLevelState = {
        status: 'LEVEL_NOT_STARTED',
        levelToRender: 1,
    };
    
    const levelStateReducer = (state: InternalLevelState, property: LevelStateProperties) => {
        switch (property.prop) {
            case 'status':
                return {...state, status: property.value};
            case 'levelToRender':
                return {...state, levelToRender: property.value};
            default:
                return state;
        } 
    }
    
    const [state, dispatchState] = useReducer(levelStateReducer, initialState);

    const transition = useCallback((action: LevelActions | void) => {
        const newStatus = action ? levelTransitions[state.status][action]: undefined;
        if (newStatus) {
            dispatchState({prop: 'status', value: newStatus});
        }
    },[state.status])
   
    const updateLevelToRender = useCallback((level:number = 1) => {
        dispatchState({prop: 'levelToRender', value: level});
    },[])

    const char = useCharacter();
    const monsters = useMonsters(char);
    const items = useItems();

    const toReturn: LevelState = useMemo(()=> { return {
        status: state.status,
        levelToRender: state.levelToRender,
        char,
        items,
        monsters,
        transition,
        updateLevelToRender
    }},[state, char, items, monsters, transition, updateLevelToRender])

    return toReturn;
}