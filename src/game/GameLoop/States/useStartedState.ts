import { useEffect } from "react";
import { UseStateProps } from "./UseStateProps";

type Props= {
    counterDown: any;
    music: HTMLAudioElement;
}

export const useStartedState = ({transition, gameState, counterDown, music}:UseStateProps & Props) => {
    
    useEffect(()=>{
        if(gameState.status === 'STARTED' && !counterDown.isCounting) {
            counterDown.start();
            music.loop = true;
            music.play();
            transition('BEGIN_COUNTING_DOWN');
        } 
    }, [gameState.status, counterDown, transition, music]);

}