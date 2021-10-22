export type ChasingTypes = 'CHAR_CHASE' | 'FRONT_CHASE' | 'RIGHT_CHASE';

type MonstersData = {
    [index: number]: {
        name: string;
        chasingType: ChasingTypes;
    }
}

export const monstersData: MonstersData = {
    1: {
        name: 'John',
        chasingType: 'CHAR_CHASE',
    },
    2: {
        name: 'Mary',
        chasingType: 'FRONT_CHASE',
    },
    3: {
        name: 'Joseph',
        chasingType: 'RIGHT_CHASE',
    }
}