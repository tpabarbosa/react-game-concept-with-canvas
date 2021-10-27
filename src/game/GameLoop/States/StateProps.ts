import { ValidDirections } from "../../types/Directions";
import { Actions, ImagesStatus, Status } from "../../types/GameState";

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
    setIsCharUpdateRequired: (value: boolean) => void;
    setIsMonstersUpdateRequired: (value: boolean) => void;
    setIsItemsUpdateRequired: (value: boolean) => void;
    setHasMonsterWin: (value: boolean) => void;
    setHasCharWin: (value: boolean) => void;
    updateLives: (value: number) => void;
    updateCollected: (toAdd: number) => void;
    updatePhase: (toShow: number, toLoad: number) => void;
    stopLoopTimers: () => void;
}

export type StateProps = {
    phaseStatus: PhaseStatus;
}

export type StatesType = {
    [state in Status]: StateType;
  }

export type UserInputType = {
    input: {type: 'keypress', value:KeyboardEvent} | 
            {type:'buttonclick', subtype:string, value: ValidDirections | null} ;
}

  export type StateType =  () => {
        handleUserInput: ({input}:UserInputType , phaseStatus:StateProps) => Actions | undefined | void;
        handleState: ({phaseStatus}: StateProps) => Actions | undefined | void;
  
}