import { useCallback } from "react";
import { useEvent } from "../../../hooks/useEvent"
import { UseStateProps } from "./UseStateProps";

type Props = {
    setHasMonsterWin: (value: boolean) => void;
    setHasCharWin: (value: boolean) => void;
}

export const useInitializedState = ({transition, gameState, setHasMonsterWin, setHasCharWin}: UseStateProps & Props) => {

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (e.code === 'Enter' && gameState.status==='INITIALIZED') {
            setHasMonsterWin(false);
            setHasCharWin(false);
            transition('START_COMMAND');
        }
    },[transition, gameState.status, setHasMonsterWin, setHasCharWin])

    useEvent('keyup', handleKeyPress);
}