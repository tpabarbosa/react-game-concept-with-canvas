import { Actions, GameState, ImagesStatus, Status } from "../../types/GameState";

export type PhaseStatus = {
    char: any;
    items: any;
    monsters: any;
    hasMonsterWin: boolean;
    hasCharWin: boolean;
    audioPlayer: any;
    counterDown: any;
    gameStatus: Status;
    imagesLoaded: ImagesStatus;
    lives: number;
    showingPhase: number;
    loadingPhase: number;
    setIsUpdateRequired: (value: boolean) => void;
    setHasMonsterWin: (value: boolean) => void;
    setHasCharWin: (value: boolean) => void;
    updateLives: (value: number) => void;
    updatePhase: (toShow: number, toLoad: number) => void;
    stopLoopTimers: () => void;
}

export type StateProps = {
    phaseStatus: PhaseStatus;
}
