
import { useCallback } from 'react';

import { GameProps } from "../types/GameStatus";
import { ValidDirections } from '../types/Directions';

export const useKeyHandler = ({gameState, gameStateDispatcher}: GameProps) => {

    const handleGameStatus = useCallback((e: KeyboardEvent) => {
        
        if (e.code === 'Enter' && gameState.status !== 'COUNTING_DOWN') {
            //init char and monsters
            if(gameState.status === 'DEFEAT' ) {
              gameStateDispatcher({type: 'lives', value: 3});
              gameStateDispatcher({type: 'status', value: 'NOT_STARTED'});
              gameStateDispatcher({type: 'phase', value: {showingPhase: 1, loadingPhase: 1}});
              
              return;
            }
            if(gameState.status === 'VICTORY') {
              if (gameState.phase.loadingPhase<2) {
                gameStateDispatcher({type: 'phase', value: {showingPhase: gameState.phase.showingPhase+1, loadingPhase: gameState.phase.loadingPhase+1}});
              } else {
                gameStateDispatcher({type: 'phase', value: {showingPhase: gameState.phase.showingPhase+1, loadingPhase: gameState.phase.loadingPhase}});
              }
              gameStateDispatcher({type: 'status', value: 'NOT_STARTED'});
              return;
            }
            if(gameState.status === 'LIFE_LOST') {
              gameStateDispatcher({type: 'status', value: 'RESTART_PHASE'});
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