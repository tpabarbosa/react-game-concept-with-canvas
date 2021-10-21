import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import * as S from './GameLoop.styles';
import CanvasContext from "./contexts/CanvasContext";
import { GameProps } from './types/GameStatus';
import {mapDimensions} from './MapArea/mapDimensions'
import { MapArea } from './MapArea';
import { useCharacter } from './MapArea/Entities/Character/useCharacter';
import { useMonsters } from './MapArea/Entities/Monsters/useMonsters';
import {useItems} from './MapArea/Entities/Items/useItems';
import { useKeyHandler } from './hooks/useKeyHandler';
import { useKeyboardEvent } from './hooks/useKeyboardEvent';
import { Buffering } from './Buffering';

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
        gameStateDispatcher({type: 'status', value: 'DEFEAT'});
      }
    }, [gameState.status, audioDefeat, gameStateDispatcher]);

    const onCharWin = useCallback(() => {
      if (gameState.status === 'RUNNING') {
        audioVictory.play();
        gameStateDispatcher({type: 'status', value: 'VICTORY'});
      }
    }, [gameState.status, audioVictory, gameStateDispatcher]);


    //
    //character creation 
    //
    const char = useCharacter({name:'Tati'});
    //
    // Monsters creation
    //
    const monsters = useMonsters({char:{position: char.position, direction: char.direction}, onMonsterWin: onMonsterWin, gameState: gameState})
    //
    // Items creation
    //
    const items = useItems({onCollectedAll: onCharWin, gameState:gameState});


    //Initializing game
    useEffect(() => {
      if(gameState.status==='NOT_STARTED' && gameState.imagesLoaded==='MONSTERS') {
        char.init();
        monsters.init();
        items.init(20);
        lastTimeChar.current=0;
        lastTimeItems.current=0;
        lastTimeMonsters.current=0
        lastTimeMonstersChase.current=0;
        music.loop = true;
        music.currentTime = 0;
        setIsUpdateRequired(true);
        gameStateDispatcher({type: 'status', value: 'INITIALIZED'});
      }
      if(gameState.status==='RUNNING') {
        audioClockTicking.pause();
        music.play();
      }
      if(gameState.status==='COUNTING_DOWN') {
        music.play();
      }
      if(gameState.status==='PAUSED') {
        music.pause();
        lastTimeChar.current=0;
        lastTimeItems.current=0;
        lastTimeMonsters.current=0
        lastTimeMonstersChase.current=0;
        audioClockTicking.loop=true;
        audioClockTicking.currentTime=0;
        audioClockTicking.play();
      }

      if(gameState.status==='DEFEAT' || gameState.status==='VICTORY') {
        music.pause();
      }
    }, [gameState, char, monsters, items, gameStateDispatcher, music, audioClockTicking]);

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

    useKeyboardEvent('keyup', handleCharacterDirection);
    useKeyboardEvent('keyup', keyHandler.handleGameStatus);


    const tick = useCallback((time) => {
      setIsUpdateRequired(false);
      if(gameState.status === 'RUNNING') {
        if(!lastTimeChar.current || time > lastTimeChar.current + 310) {
          lastTimeChar.current = time;
          char.move();
          items.checkCollected(char.position);
          setIsUpdateRequired(true);
        }
        //monsters animation
        if(!lastTimeMonsters.current || time > lastTimeMonsters.current + 430) {
          lastTimeMonsters.current = time;
          monsters.move();
          setIsUpdateRequired(true);
        }
        //chasing animation
        if(!lastTimeMonstersChase.current || (time > lastTimeMonstersChase.current + 6000 && !monsters.isChasing)) {
          lastTimeMonstersChase.current = time;
          monsters.changeChasingMode(true);
          setIsUpdateRequired(true);
        }
        if(!lastTimeMonstersChase.current || (time > lastTimeMonstersChase.current + 12000 && monsters.isChasing)) {
          lastTimeMonstersChase.current = time;
          monsters.changeChasingMode(false);
          setIsUpdateRequired(true);
        }
        //items animation
        if(!lastTimeItems.current || time > lastTimeItems.current + 125){
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
      
    }, [isUpdateRequired, gameStateDispatcher,  gameState.status, items, char, monsters]);

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

            <Buffering gameState={gameState} gameStateDispatcher={gameStateDispatcher}/>

            {gameState.isMapVisible && gameState.imagesBuffered==='ALL_IMAGES' &&
                <MapArea gameState={gameState} gameStateDispatcher={gameStateDispatcher} char={{direction: char.direction, pos: char.position}} activeMonsters={monsters.monsters} items={items.items} itemsFrame={items.itemsFrame} scale={scale}/>
            }
            </S.Container>
        </CanvasContext.Provider>
    )
}