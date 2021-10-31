import { CharType } from "../GameEntities/useCharacter";
import { ItemsType } from "../GameEntities/useItems";
import { MonstersType } from "../GameEntities/useMonsters";

export type LevelState = {
    status: LevelStatus;
    levelToRender: number;
    char: CharType;
    monsters: MonstersType;
    items: ItemsType;
    transition: (action: LevelActions | void) => void,
    updateLevelToRender: (level:number) => void,
}

export type InternalLevelState = {
    status: LevelStatus;
    levelToRender: number;
}

export type LevelStateProperties = 
    { prop: 'status', value: LevelStatus } |
    { prop: 'levelToRender', value: number }

export type LevelStatus = 'LEVEL_NOT_STARTED'|
'LEVEL_IDLE' | 'COUNTING_DOWN' | 'RUNNING' | 'PAUSED' | 'VICTORY_LEVEL_ENDED' | 'DEFEATED_LEVEL_ENDED' | 'LIFE_LOST'; 

export type LevelActions = 'FINISH_LOADING_LEVEL' | 'FINISH_RELOADING_LEVEL' | 'FINISH_COUNTING_DOWN' | 'START_RUNNING_COMMAND'  |'PAUSE_COMMAND' | 'UNPAUSE_COMMAND' | 'LOST_A_LIFE' | 'LEVEL_WON' |'LEVEL_LOST'| 'END_LEVEL';

type LevelTransitions = {
    [state in LevelStatus]: {[action in LevelActions]?: LevelStatus}
}

export const levelTransitions: LevelTransitions = {
    LEVEL_NOT_STARTED: {
        FINISH_LOADING_LEVEL: 'LEVEL_IDLE'
    },
    LEVEL_IDLE: {
        START_RUNNING_COMMAND: 'COUNTING_DOWN',
    },
    COUNTING_DOWN: {
        FINISH_COUNTING_DOWN: 'RUNNING'
    },
    RUNNING: {
        PAUSE_COMMAND: 'PAUSED',
        LOST_A_LIFE: 'LIFE_LOST',
        LEVEL_WON: 'VICTORY_LEVEL_ENDED',
        LEVEL_LOST: 'DEFEATED_LEVEL_ENDED'
    },
    LIFE_LOST: {
        FINISH_RELOADING_LEVEL: 'LEVEL_NOT_STARTED'
    },
    PAUSED: {
        UNPAUSE_COMMAND: 'RUNNING',
    },
    VICTORY_LEVEL_ENDED: {
        END_LEVEL: 'LEVEL_NOT_STARTED'
    },
    DEFEATED_LEVEL_ENDED: {
        END_LEVEL: 'LEVEL_NOT_STARTED'
    }
}