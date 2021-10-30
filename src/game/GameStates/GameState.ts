import { CounterDownType } from "../helpers/Counter/useCounterDown";
import { AudioPlayerType } from "../AudioPlayer/useAudioPlayer";

export type GameProps = {
    gameState: GameState,
    updateGameStatus: React.Dispatch<GameStateProperties>,
}

export type GameState = {
    status: GameStatus;
    images: ImagesStatus;
    charType: number;
    charName: string;
    lives: number;
    points: number;
    level: number;
    counterDown: CounterDownType;
    audioPlayer: AudioPlayerType;
    transition: (action: GameActions | void) => void,
    updateLives: (lives:number) => void,
    updateLevel: (level:number) => void,
    updatePoints: (points:number) => void
    updateLoadedImages: (images: ImagesStatus | void) => void
    setChar: (charType:number, charName:string) => void,
}

export type InternalGameState = {
    status: GameStatus;
    images: ImagesStatus;
    charType: number;
    charName: string;
    lives: number;
    points: number;
    level: number;
}

export type GameStateProperties = 
    { prop: 'status', value: GameStatus } |
    { prop: 'images', value: ImagesStatus } |
    { prop: 'charType', value: number } |
    { prop: 'charName', value: string } |
    { prop: 'lives', value: number } |
    { prop: 'points', value: number } |
    { prop: 'level', value: number } 


export type GameStatus = 'GAME_NOT_STARTED' | 'GAME_STARTED' | 'GAME_RUNNING' | 'LEVEL_UP' | 'GAME_OVER' | 'GAME_ENDED';

export type GameActions = 'FINISH_LOADING_LEVEL' | 'START_LEVEL_COMMAND'  | 'CHARACTER_WAS_DEFEATED' | 'CHARACTER_HAS_WON' | 'NEW_GAME_COMMAND' | 'END_GAME_COMMAND';


type GameTransitions = {
    [state in GameStatus]: {[action in GameActions]?: GameStatus}
}

export const gameTransitions: GameTransitions = {
    GAME_NOT_STARTED: {
        NEW_GAME_COMMAND: 'GAME_STARTED'
    },
    GAME_STARTED: {
        FINISH_LOADING_LEVEL: 'GAME_RUNNING'
    },
    GAME_RUNNING: {
        CHARACTER_HAS_WON: 'LEVEL_UP',
        CHARACTER_WAS_DEFEATED: 'GAME_OVER'
    },
    LEVEL_UP: {
        FINISH_LOADING_LEVEL: 'GAME_RUNNING'
    },
    GAME_OVER: {
        NEW_GAME_COMMAND: 'GAME_STARTED',
        END_GAME_COMMAND: 'GAME_ENDED'
    },
    GAME_ENDED: {
        NEW_GAME_COMMAND: 'GAME_STARTED'
    }
}


export type ImagesStatus = 'NO_IMAGES'| 'MAP' | 'ITEMS' | 'CHARACTER' | 'MONSTERS' | 'ALL_IMAGES';

type ImagesTransitions = {
    [status in ImagesStatus]: ImagesStatus[] 
}

export const imagesTransitions: ImagesTransitions = {
    NO_IMAGES: ['MAP'],
    MAP: ['ITEMS'],
    ITEMS: ['CHARACTER'],
    CHARACTER: ['MONSTERS'], 
    MONSTERS: ['ALL_IMAGES'],
    ALL_IMAGES: ['NO_IMAGES', 'MAP'],
}

