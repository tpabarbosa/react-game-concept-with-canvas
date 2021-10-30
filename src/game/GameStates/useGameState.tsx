import { useCallback, useReducer, useMemo } from "react";
import { useCounterDown } from "../helpers/Counter/useCounterDown";
import { useAudioPlayer } from "../AudioPlayer/useAudioPlayer";
import { GameActions, GameState, GameStateProperties, gameTransitions, ImagesStatus, imagesTransitions, InternalGameState } from "./GameState";

export const useGameState = (): GameState => {
    
    const counterDown = useCounterDown({initial: 3});
    const audioPlayer = useAudioPlayer();

    const initialState: InternalGameState = {
        status: 'GAME_NOT_STARTED',
        images: 'NO_IMAGES',
        charType: 1,
        charName: 'Player',
        lives: 3,
        level: 1,
        points: 0,
    }

    const gameStateReducer = (state: InternalGameState, property: GameStateProperties) => {
        switch (property.prop) {
            case 'status':
                return {...state, status: property.value};
            case 'level':
                return {...state, level: property.value};
            case 'lives':
                return {...state, lives: property.value};
            case 'points':
                return {...state, points: property.value};
            case 'charType':
                return {...state, charType: property.value};
            case 'charName':
                return {...state, charName: property.value};
            case 'images':
                return {...state, images: property.value};
            default:
                return state;
        } 
    }
    
    const [state, dispatchState] = useReducer(gameStateReducer, initialState);

    const transition = useCallback((action: GameActions | void) => {
        const newStatus = action ? gameTransitions[state.status][action]: undefined;
        if (newStatus) {
            dispatchState({prop: 'status', value: newStatus});
        }
    }, [state])
    
    const updateLives = useCallback((lives:number = 3) => {
        dispatchState({prop: 'lives', value: lives});
    }, [])
    
    const updateLevel = useCallback((level:number = 1) => {
        dispatchState({prop: 'level', value: level});
    },[])
    
    const updatePoints = useCallback((points: number = 0) => {
        dispatchState({prop: 'points', value: points});
    },[])

    const updateLoadedImages = useCallback((image: ImagesStatus | void) => {
        const newStatus = image ? imagesTransitions[state.images].includes(image) ? image: undefined :undefined;
        if (newStatus) {
            dispatchState({prop: 'images', value: newStatus});
        }
    },[state])
    
    const setChar = useCallback((charType: number, charName: string) => {
        dispatchState({prop: 'charType', value: charType});
        dispatchState({prop: 'charName', value: charName});
    },[])

    const toReturn = useMemo(():GameState=> {return {
        status: state.status,
        images: state.images,
        charType: state.charType,
        charName: state.charName,
        lives: state.lives,
        level: state.level,
        points: state.points,
        counterDown: counterDown,
        audioPlayer: audioPlayer,
        transition,
        updateLives,
        updateLevel,
        updatePoints,
        updateLoadedImages,
        setChar,
    }},[setChar, state, transition, updateLives, updateLevel, updatePoints, updateLoadedImages, counterDown, audioPlayer])

    return toReturn;
}