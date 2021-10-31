import { useCallback, useMemo, useReducer } from "react";
import { AppActions, AppState, AppStateProperties, appStatusTransitions } from "./AppState";
import { useGameState } from "./useGameState";
import { useLevelState } from "./useLevelState";

export const useAppState = () => {

    const initialAppState: AppState = {
        status: 'APP_STARTED',
    }
    
    const appStateReducer = (state: AppState, property: AppStateProperties) => {
        switch (property.prop) {
            case 'status':
                return {...state, status: property.value};
            default:
                return state;
        }
    }
    
    const [appState, updateAppState] = useReducer(appStateReducer, initialAppState);
    
    const appTransition = useCallback((action: AppActions | void) => {
        const newStatus = action ? appStatusTransitions[appState.status][action]: undefined;
        if (newStatus) {
            updateAppState({prop: 'status', value: newStatus});
        }
    },[appState.status])
    
    
    const levelState = useLevelState();
    const gameState = useGameState();

    const toReturn = useMemo(()=> { 
        return {
            appState, 
            gameState, 
            levelState, 
            appTransition
        }
    }, [appState, levelState, gameState, appTransition])

    return toReturn;
}