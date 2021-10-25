import { useCallback, useEffect } from "react";
import { useEvent } from "../../../hooks/useEvent";
import { UseStateProps } from "./UseStateProps";

type Props = {
    music: HTMLAudioElement;
    audioClockTicking: HTMLAudioElement;
    stopLoopTimers: () => void;
}

export const usePausedState = ({transition, gameState, music, audioClockTicking, stopLoopTimers}: UseStateProps & Props) => {
    
    useEffect(() => {
        if (gameState.status==='PAUSED') {
            music.pause();
            audioClockTicking.loop=true;
            audioClockTicking.currentTime=0;
            audioClockTicking.play();
        }
    }, [gameState.status, music, audioClockTicking]) 

    const handleGameState = useCallback((e: KeyboardEvent)  => {
        if (e.code === 'Enter' && gameState.status==='PAUSED') {
            audioClockTicking.pause();
            music.play();
            stopLoopTimers();
            transition('UNPAUSE_COMMAND');
        }
    },[gameState.status, transition, music, audioClockTicking, stopLoopTimers])

    useEvent('keyup', handleGameState);
}
