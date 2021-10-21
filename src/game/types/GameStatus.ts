export type GameState = {
    imagesBuffered: ImagesStatus;
    imagesLoaded: ImagesStatus;
    status: Status;
    isMapVisible: boolean;
}

export type ImagesStatus = 'NO_IMAGES'| 'MAP' | 'ITEMS' | 'CHARACTER' | 'MONSTERS' | 'ALL_IMAGES';

export type Status = 'NOT_STARTED' | 'INITIALIZED' | 'STARTED' | 'COUNTING_DOWN' | 'RUNNING' | 'PAUSED' | 'DEFEAT' | 'VICTORY';

export type GameStateActions = 
    { type: 'status', value: Status } |
    { type: 'imagesBuffered', value: ImagesStatus } |
    { type: 'imagesLoaded', value: ImagesStatus } |
    { type: 'isMapVisible', value: boolean};

    
export type GameProps = {
    gameState: GameState,
    gameStateDispatcher: React.Dispatch<GameStateActions>,
}