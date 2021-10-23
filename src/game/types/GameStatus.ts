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
}

export type Phases = {
    showingPhase: number;
    loadingPhase: number;
}

export type ImagesStatus = 'NO_IMAGES'| 'MAP' | 'ITEMS' | 'CHARACTER' | 'MONSTERS' | 'ALL_IMAGES';

export type Status = 'NOT_STARTED' | 'LIFE_LOST' | 'RESTART_PHASE' | 'INITIALIZED' | 'STARTED' | 'COUNTING_DOWN' | 'RUNNING' | 'PAUSED' | 'DEFEAT' | 'VICTORY';

export type GameStateActions = 
    { type: 'status', value: Status } |
    { type: 'phase', value: Phases } |
    { type: 'lives', value: number } |
    { type: 'imagesBuffered', value: ImagesStatus } |
    { type: 'imagesLoaded', value: ImagesStatus } |
    { type: 'isMapVisible', value: boolean};
