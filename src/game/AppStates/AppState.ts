export type AppState = {
    status: AppStatus;
}

export type AppStatus = 'APP_STARTED' | 'APP_IDLE' | 'GAME_STARTED';

export type AppActions = 'FINISHED_BUFFERING' | 'NEW_GAME_COMMAND' | 'LEAVE_GAME_COMMAND' | 'GAME_OVER';

type AppTransitions = {
    [status in AppStatus]: {[action in AppActions]?: AppStatus}
}

export const appStatusTransitions: AppTransitions = {
    APP_STARTED: {
        FINISHED_BUFFERING: 'APP_IDLE'
    },
    APP_IDLE: {
        NEW_GAME_COMMAND: 'GAME_STARTED'
    },
    GAME_STARTED: {
        LEAVE_GAME_COMMAND: 'APP_IDLE',
        GAME_OVER: 'APP_IDLE'
    }
}

export type AppStateProperties = 
    { prop: 'status', value: AppStatus };
