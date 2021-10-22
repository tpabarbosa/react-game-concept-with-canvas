export type GameProps = {
    gameState: GameState,
    gameStateDispatcher: React.Dispatch<GameStateActions>,
}

export type GameState = {
    phase: number;
    imagesBuffered: ImagesStatus;
    imagesLoaded: ImagesStatus;
    status: Status;
    isMapVisible: boolean;
}

export type ImagesStatus = 'NO_IMAGES'| 'MAP' | 'ITEMS' | 'CHARACTER' | 'MONSTERS' | 'ALL_IMAGES';

export type Status = 'NOT_STARTED' | 'INITIALIZED' | 'STARTED' | 'COUNTING_DOWN' | 'RUNNING' | 'PAUSED' | 'DEFEAT' | 'VICTORY';

export type GameStateActions = 
    { type: 'status', value: Status } |
    { type: 'phase', value: number } |
    { type: 'imagesBuffered', value: ImagesStatus } |
    { type: 'imagesLoaded', value: ImagesStatus } |
    { type: 'isMapVisible', value: boolean};
