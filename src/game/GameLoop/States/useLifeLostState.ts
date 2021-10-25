import { useCallback, useEffect } from "react";
import { useEvent } from "../../../hooks/useEvent";
import { UseStateProps } from "./UseStateProps";

type Props = {
    audioDefeat: HTMLAudioElement;
}

export const useLifeLostState = ({transition, gameState, audioDefeat}:UseStateProps & Props) => {

    useEffect(() => { 
        if (gameState.status==='LIFE_LOST') {
            audioDefeat.play();
        }
    },[gameState.status, audioDefeat])

    const handleGameState = useCallback((e: KeyboardEvent)  => {
        if (e.code === 'Enter' && gameState.status==='LIFE_LOST') {
            transition('REINITIALIZE_COMMAND');
        }
    },[gameState.status, transition]);


    useEvent('keyup', handleGameState)
}