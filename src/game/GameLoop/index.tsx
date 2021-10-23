import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as S from './styles';

import CanvasContext from "./CanvasContext";

import { GameProps } from '../types/GameStatus';

import { mapDimensions } from '../constants/mapDimensions'

import { useCharacter } from './MapArea/Entities/Character/useCharacter';
import { useMonsters } from './MapArea/Entities/Monsters/useMonsters';
import { useItems } from './MapArea/Items/useItems';

import { useEvent } from '../../hooks/useEvent';
import { useKeyHandler } from './useKeyHandler';

import { MapArea } from './MapArea';
import { Buffering } from './Buffering';
import { phases } from '../constants/phases';

export const GameLoop = ({ gameState, gameStateDispatcher}: GameProps) => {
    //
    // canvas
    //
    const {width, height, scale} = mapDimensions;
    const canvasRef = useRef<HTMLCanvasElement | null>(null) ;
    const [ctx, setCtx] = useState<CanvasRenderingContext2D| null>(null);
    const [isUpdateRequired, setIsUpdateRequired] = useState(false);
    const loopRef = useRef<number>();
    const lastTimeChar = useRef<number>();
    const lastTimeMonsters = useRef<number>();
    const lastTimeMonstersChase = useRef<number>();
    const lastTimeItems = useRef<number>();

    const music = useMemo(() => new Audio('assets/audios/music.mp3'), []);
    const audioVictory = useMemo(() => new Audio('assets/audios/victory.mp3'), []);
    const audioDefeat = useMemo(() => new Audio('assets/audios/defeated.mp3'), []);
    const audioClockTicking = useMemo(() => new Audio('assets/audios/clock_ticking.mp3'), []);

    useEffect(() => {
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
        }
    }, [setCtx, canvasRef]);

    
//
    //End Game Conditions
    //
    const onMonsterWin = useCallback(() => {
      if (gameState.status === 'RUNNING') {
        audioDefeat.play();
        if (gameState.lives > 1) {
          gameStateDispatcher({type: 'lives', value: gameState.lives-1});
          gameStateDispatcher({type: 'status', value: 'LIFE_LOST'});
        } else {
          gameStateDispatcher({type: 'lives', value: gameState.lives-1});
          gameStateDispatcher({type: 'status', value: 'DEFEAT'});
        }
        
      }
    }, [gameState.status, gameState.lives, audioDefeat, gameStateDispatcher]);

    const onCharWin = useCallback(() => {
      if (gameState.status === 'RUNNING') {
        audioVictory.play();

        gameStateDispatcher({type: 'status', value: 'VICTORY'});
      }
    }, [gameState.status, audioVictory, gameStateDispatcher]);

    const onImagesBuffered = useCallback(() => {
      gameStateDispatcher({type: 'isMapVisible', value: true});
    }, [gameStateDispatcher]);
    
    //
    //character creation 
    //
    const char = useCharacter({name:'Tati', phase:gameState.phase.loadingPhase});
    //
    // Monsters creation
    //
    const monsters = useMonsters({char:{position: char.position, direction: char.direction}, onMonsterWin: onMonsterWin, gameState: gameState})
    //
    // Items creation
    //
    const items = useItems({onCollectedAll: onCharWin, gameState:gameState});

    const stopLoopTimers = useCallback(()=> {
      lastTimeChar.current=0;
      lastTimeItems.current=0;
      lastTimeMonsters.current=0
      lastTimeMonstersChase.current=0;
    }, [lastTimeMonsters, lastTimeChar, lastTimeItems, lastTimeMonstersChase])

    const initialize = useCallback((type: 'NEW_PHASE' | 'SAME_PHASE')=> {
      stopLoopTimers();
      if (type === 'NEW_PHASE') {
        items.init();
        music.currentTime = 0;
      }
      char.init();
      monsters.init();
      setIsUpdateRequired(true);
    }, [char, monsters, items, music, stopLoopTimers, setIsUpdateRequired])

    //Initializing game
    useEffect(() => {
      if(gameState.status==='NOT_STARTED' && gameState.imagesLoaded==='MONSTERS') {
        initialize('NEW_PHASE');
        gameStateDispatcher({type: 'status', value: 'INITIALIZED'});
      }
      if(gameState.status==='RESTART_PHASE') {
        initialize('SAME_PHASE');
        gameStateDispatcher({type: 'status', value: 'INITIALIZED'});
      }
      if(gameState.status==='RUNNING') {
        audioClockTicking.pause();
      }
      if(gameState.status==='COUNTING_DOWN') {
        music.loop = true;
        music.play();
      }
      if(gameState.status==='PAUSED') {
        music.pause();
        stopLoopTimers();
        audioClockTicking.loop=true;
        audioClockTicking.currentTime=0;
        audioClockTicking.play();
      }

      if(gameState.status==='DEFEAT' || gameState.status==='VICTORY') {
        music.pause();
      }
    }, [gameState, gameStateDispatcher, music, audioClockTicking, initialize, stopLoopTimers]);

    //
    // Keyboard Events
    //
    const keyHandler = useKeyHandler({ gameState, gameStateDispatcher } );

    //change character direction
    const handleCharacterDirection = useCallback((e: KeyboardEvent) => {
        const direction = keyHandler.handleCharacterDirection(e);
        if (direction) {
          char.changeDirection(direction);
      }
      
    },[char, keyHandler]);

    useEvent('keyup', handleCharacterDirection);
    useEvent('keyup', keyHandler.handleGameStatus);


    const tick = useCallback((time) => {
      setIsUpdateRequired(false);
      if(gameState.status === 'RUNNING') {
        if(!lastTimeChar.current || time > lastTimeChar.current + phases[gameState.phase.loadingPhase].char.refreshTime) {
          lastTimeChar.current = time;
          char.move();
          items.checkCollected(char.position);
          setIsUpdateRequired(true);
        }
        //monsters animation
        if(!lastTimeMonsters.current || time > lastTimeMonsters.current + phases[gameState.phase.loadingPhase].monsters.refreshTime) {
          lastTimeMonsters.current = time;
          monsters.move();
          setIsUpdateRequired(true);
        }
        //chasing animation
        if(!lastTimeMonstersChase.current || (time > lastTimeMonstersChase.current + phases[gameState.phase.loadingPhase].monsters.retreatTime && !monsters.isChasing)) {
          lastTimeMonstersChase.current = time;
          monsters.changeChasingMode(true);
          setIsUpdateRequired(true);
        }
        if(!lastTimeMonstersChase.current || (time > lastTimeMonstersChase.current + phases[gameState.phase.loadingPhase].monsters.chasingTime && monsters.isChasing)) {
          lastTimeMonstersChase.current = time;
          monsters.changeChasingMode(false);
          setIsUpdateRequired(true);
        }
        //items animation
        if(!lastTimeItems.current || time > lastTimeItems.current + phases[gameState.phase.loadingPhase].items.refreshTime){
          lastTimeItems.current = time;
          items.animate();
          setIsUpdateRequired(true);
        }
      }
                  
      if (isUpdateRequired) {
        gameStateDispatcher({type: 'isMapVisible', value:false});
        gameStateDispatcher({type: 'isMapVisible', value:true});   
        setIsUpdateRequired(false);
      } 
      loopRef.current = requestAnimationFrame(tick);  
      
    }, [isUpdateRequired, gameStateDispatcher,  gameState.status, items, char, monsters, gameState.phase]);

    useEffect(() => {   
        loopRef.current = requestAnimationFrame(tick);
        return () => {
            loopRef.current && cancelAnimationFrame(loopRef.current);
        }
    }, [loopRef, tick]);


    // Screen
    return (
        <CanvasContext.Provider value={ctx}>
            <S.Container>
            
            <canvas
                ref={canvasRef}
                width={width*scale}
                height={height*scale}
            />

            <Buffering gameState={gameState} gameStateDispatcher={gameStateDispatcher} onImagesBuffered={onImagesBuffered}/>

            {gameState.isMapVisible && gameState.imagesBuffered==='ALL_IMAGES' &&
                <MapArea gameState={gameState} gameStateDispatcher={gameStateDispatcher} char={{direction: char.direction, pos: char.position}} activeMonsters={monsters.monsters} items={items.items} itemsFrame={items.itemsFrame} scale={scale}/>
            }
            </S.Container>
        </CanvasContext.Provider>
    )
}