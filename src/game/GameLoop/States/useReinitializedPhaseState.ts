import { useCallback, useEffect } from "react";
import { UseStateProps } from "./UseStateProps";

type Props = {
    char: any;
    monsters: any;
    stopLoopTimers: () => void;
}

export const useReinitializedPhaseState = ({transition, gameState, char, monsters, stopLoopTimers }:UseStateProps & Props) => {

    const initialize = useCallback(() => {
        stopLoopTimers();
        char.init();
        monsters.init();
    },[char, monsters,  stopLoopTimers]);

    useEffect(() => {
        if (gameState.status==='REINITIALIZED_PHASE') {
            initialize();
            transition('INITIALIZED', true);
        };
    },[gameState.status, gameState.imagesLoaded, initialize, transition]);
}