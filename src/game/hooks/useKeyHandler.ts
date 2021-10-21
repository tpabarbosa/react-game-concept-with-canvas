
import { useCallback } from 'react';
import { ValidDirections } from '../MapArea/Entities/EntitiesDirections';
import { GameProps } from "../types/GameStatus";

export const useKeyHandler = ({gameState, gameStateDispatcher}: GameProps) => {

    const handleGameStatus = useCallback((e: KeyboardEvent) => {
        
        if (e.code === 'Enter' && gameState.status !== 'COUNTING_DOWN') {
            //init char and monsters
            if(gameState.status === 'DEFEAT' || gameState.status === 'VICTORY') {
              gameStateDispatcher({type: 'status', value: 'NOT_STARTED'});
              return;
            }
            //start game
            if (gameState.status ==='INITIALIZED' ) {
              gameStateDispatcher({type: 'status', value: 'STARTED'});
              return;
            }
            //pause game
            if (gameState.status === 'RUNNING') {
              console.log('pause game');
              gameStateDispatcher({type: 'status', value: 'PAUSED'});
              return;
            }
            //unpause game
            if (gameState.status === 'PAUSED') {
              console.log('unpause game');
              gameStateDispatcher({type: 'status', value: 'RUNNING'});
              return;
            }

        }
        
      }, [gameState, gameStateDispatcher]);

      const handleCharacterDirection = (e: KeyboardEvent): ValidDirections | void => {
          if (gameState.status ==='RUNNING') {
            switch (e.code) {
                case 'KeyA':
                case 'ArrowLeft':
                  return 'left';
        
                case 'KeyD':
                case 'ArrowRight':
                  return 'right';
          
                case 'KeyS' :
                case 'ArrowDown':
                  return 'down';
          
                case 'KeyW':
                case 'ArrowUp' :
                  return 'up';
              }
          }
        
      }

    return {
        handleGameStatus,
        handleCharacterDirection
    }
}