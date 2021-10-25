import { useEffect } from "react";
import { UseStateProps } from "./UseStateProps";

type Props= {
    counterDown: any;
    music: HTMLAudioElement;
}

export const useCountingDownState = ({transition, gameState, counterDown, music}:UseStateProps & Props) => {
    
    useEffect(()=>{
        if(gameState.status ==='COUNTING_DOWN' && counterDown.count===0) {
            transition('FINISH_COUNTING_DOWN');
        }
            
    }, [gameState.status, counterDown, transition, music]);

}