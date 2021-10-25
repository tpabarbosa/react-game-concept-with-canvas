import { useCallback, useEffect } from "react";
import { useEvent } from "../../../hooks/useEvent";
import { ValidDirections } from "../../types/Directions";
import { UseStateProps } from "./UseStateProps";

type Props = {
    char: any;
    hasMonsterWin: boolean;
    hasCharWin: boolean;
    updateLives: (value: number) => void;

}

export const useRunningState = ({transition, gameState, char, hasMonsterWin, updateLives, hasCharWin}: UseStateProps & Props) => {
    
    useEffect(()=> {
        if (gameState.status === 'RUNNING') {
            if(hasMonsterWin) {
                updateLives(gameState.lives-1);
                gameState.lives > 1
                    ? transition('LIFE_LOST') 
                    : transition('LOST_ALL_LIVES');
            }
            if (hasCharWin) {
                transition('COLLECTED_ALL_ITEMS');
            }
        }
    }, [hasMonsterWin, hasCharWin, gameState.status, gameState.lives, transition, updateLives])

    const handleGameState = useCallback((e: KeyboardEvent)  => {
        if (e.code === 'Enter' && gameState.status==='RUNNING') {
            transition('PAUSE_COMMAND');
        }
    },[gameState.status, transition]);

    const handleChangeCharDirection = useCallback((e: KeyboardEvent) => {
        if (gameState.status==='RUNNING') {
            let direction;
            switch (e.code) {
                case 'KeyA':
                case 'ArrowLeft':
                    direction = 'left';
                    break;
                case 'KeyD':
                case 'ArrowRight':
                    direction = 'right';
                    break;
                case 'KeyS' :
                case 'ArrowDown':
                    direction = 'down';
                    break;
                case 'KeyW':
                case 'ArrowUp' :
                    direction = 'up';
            }
            if (direction as ValidDirections) {
                char.changeDirection(direction);
            }
        }
    },[char, gameState.status]);

    useEvent('keyup', handleGameState);
    useEvent('keyup', handleChangeCharDirection);

    
}
