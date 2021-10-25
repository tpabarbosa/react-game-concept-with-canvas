import { useCallback, useEffect } from "react";
import { useEvent } from "../../../hooks/useEvent";
import { phases } from "../../constants/phases";
import { UseStateProps } from "./UseStateProps";

type Props = {
    audioVictory: HTMLAudioElement;
    updatePhase: (toShow: number, toLoad: number) => void;
    music: HTMLAudioElement;
}

export const useVictoryState = ({transition, gameState, audioVictory, updatePhase, music}:UseStateProps & Props) => {

    useEffect(() => { 
        if (gameState.status==='VICTORY') {
            audioVictory.play();
            music.pause();
        }
    },[gameState.status, audioVictory, music])

    const handleGameState = useCallback((e: KeyboardEvent)  => {
        if (e.code === 'Enter' && gameState.status==='VICTORY') {
            const toLoad = gameState.phase.showingPhase === Object.keys(phases).length ? Object.keys(phases).length : gameState.phase.showingPhase+1;
            updatePhase(gameState.phase.showingPhase+1, toLoad);
            transition('NEW_GAME_COMMAND');
        }
    },[gameState.status, gameState.phase, transition, updatePhase]);


    useEvent('keyup', handleGameState)
}