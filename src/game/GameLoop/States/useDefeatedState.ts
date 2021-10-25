import { useCallback, useEffect } from "react";
import { useEvent } from "../../../hooks/useEvent";
import { UseStateProps } from "./UseStateProps";

type Props = {
    audioDefeat: HTMLAudioElement;
    updateLives: (value: number) => void;
    updatePhase: (toShow: number, toLoad: number) => void;
    music: HTMLAudioElement;
}

export const useDefeatedState = ({transition, gameState, audioDefeat, updateLives, updatePhase, music}:UseStateProps & Props) => {

    useEffect(() => { 
        if (gameState.status==='DEFEATED') {
            audioDefeat.play();
            music.pause();
        }
    },[gameState.status, audioDefeat, music])

    const handleGameState = useCallback((e: KeyboardEvent)  => {
        if (e.code === 'Enter' && gameState.status==='DEFEATED') {
            updateLives(3);
            updatePhase(1, 1);
            transition('NEW_GAME_COMMAND');
        }
    },[gameState.status, transition, updateLives, updatePhase]);


    useEvent('keyup', handleGameState)
}