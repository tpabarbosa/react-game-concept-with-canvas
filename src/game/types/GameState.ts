export type GameProps = {
    gameState: GameState,
    gameStateDispatcher: React.Dispatch<GameStateActions>,
}

export type GameState = {
    lives: number;
    phase: Phases;
    imagesBuffered: ImagesStatus;
    imagesLoaded: ImagesStatus;
    status: Status;
    isMapVisible: boolean;
    totalCollected: number;
}

export type Phases = {
    showingPhase: number;
    loadingPhase: number;
}

export type ImagesStatus = 'NO_IMAGES'| 'MAP' | 'ITEMS' | 'CHARACTER' | 'MONSTERS' | 'ALL_IMAGES';

export type Status = 'NOT_STARTED' | 'LIFE_LOST' | 'REINITIALIZED_PHASE' | 'INITIALIZED' | 'STARTED' | 'COUNTING_DOWN' | 'RUNNING' | 'PAUSED' | 'DEFEATED' | 'VICTORY' ;

export type Actions = 'IMAGES_LOADED' | 'START_COMMAND' | 'INITIALIZED' | 'BEGIN_COUNTING_DOWN' | 'FINISH_COUNTING_DOWN' | 'PAUSE_COMMAND' | 'LIFE_LOST' | 'LOST_ALL_LIVES' | 'COLLECTED_ALL_ITEMS' | 'REINITIALIZE_COMMAND' | 'NEW_GAME_COMMAND' | 'UNPAUSE_COMMAND';

type Transitions = {
    [state in Status]: {[actions in Actions]?: Status};
}

export const transitions:Transitions = {
    NOT_STARTED: {
        IMAGES_LOADED: 'INITIALIZED',
    },
    INITIALIZED: {
        START_COMMAND: 'STARTED',
    },
    STARTED: {
        BEGIN_COUNTING_DOWN: 'COUNTING_DOWN',
    },
    COUNTING_DOWN: {
        FINISH_COUNTING_DOWN: 'RUNNING',
    },
    RUNNING: {
        PAUSE_COMMAND: 'PAUSED',
        LIFE_LOST: 'LIFE_LOST',
        LOST_ALL_LIVES: 'DEFEATED',
        COLLECTED_ALL_ITEMS: 'VICTORY',
    },
    LIFE_LOST: {
        REINITIALIZE_COMMAND: 'REINITIALIZED_PHASE',
    },
    REINITIALIZED_PHASE: {
        INITIALIZED: 'INITIALIZED',
    },
    DEFEATED: {
        NEW_GAME_COMMAND: 'NOT_STARTED',
    },
    VICTORY: {
        NEW_GAME_COMMAND: 'NOT_STARTED',
    },
    PAUSED: {
        UNPAUSE_COMMAND: 'RUNNING',
        NEW_GAME_COMMAND: 'NOT_STARTED',
    },
    
}

export type GameStateActions = 
    { type: 'status', value: Status } |
    { type: 'phase', value: Phases } |
    { type: 'lives', value: number } |
    { type: 'totalCollected', value: number } |
    { type: 'imagesBuffered', value: ImagesStatus } |
    { type: 'imagesLoaded', value: ImagesStatus } |
    { type: 'isMapVisible', value: boolean};
