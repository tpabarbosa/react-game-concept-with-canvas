import { useCallback, useEffect } from "react";
import { UseStateProps } from "./UseStateProps";

type Props = {
    items: any;
    char: any;
    monsters: any;
    music: HTMLAudioElement;
    stopLoopTimers: () => void;
}

export const useNotStartedState = ({transition, gameState, items, music, char, monsters, stopLoopTimers}: UseStateProps & Props) => {
    
    const initialize = useCallback(() => {
        stopLoopTimers();
        items.init();
        char.init();
        monsters.init();
        music.currentTime = 0;
    },[items, char, monsters, music, stopLoopTimers]);

    useEffect(() => {
        if (gameState.status==='NOT_STARTED' && 
        (gameState.imagesLoaded==='ALL_IMAGES' || 
        gameState.imagesLoaded==='MONSTERS')) {
            initialize();
            transition('IMAGES_LOADED', true);
        };
    },[gameState.status, gameState.imagesLoaded, initialize, transition]);
    
}