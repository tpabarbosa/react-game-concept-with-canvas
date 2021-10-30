import { LevelType } from "./LevelType";

export const levels: LevelType= {
    1: {
        background: 1,
        objects: 1,
        char: {
            initialPosition: {x: 7, y: 8},
            initialDirection: 'down',
            refreshTime: 280,
        },
        monsters: { 
            refreshTime: 420,
            chasingTime: 15000,
            retreatTime: 7000,
            list: [
                {
                    monster: 1,
                    initialPosition: {x: 2, y: 2},
                    initialDirection: 'down',
                },
            ],
        },
        items: {
            refreshTime: 130,
            list: [
                {
                    item: 1,
                    quantity: 2,
                },
                {
                    item: 2,
                    quantity: 4,
                }
            ]
        }
    },
    2: {
        background: 1,
        objects: 1,
        char: {
            initialPosition: {x: 7, y: 5},
            initialDirection: 'down',
            refreshTime: 280,
        },
        monsters: { 
            refreshTime: 420,
            chasingTime: 16000,
            retreatTime: 6000,
            list: [
                {
                    monster: 1,
                    initialPosition: {x: 3, y: 2},
                    initialDirection: 'down',
                },
                {
                    monster: 2,
                    initialPosition: {x: 2, y: 12},
                    initialDirection: 'down',
                }
            ],
        },
        items: {
            refreshTime: 130,
            list: [
                {
                    item: 1,
                    quantity: 4,
                },
                {
                    item: 2,
                    quantity: 8,
                }
            ]
        }
    },
    3: {
        background: 1,
        objects: 1,
        char: {
            initialPosition: {x: 7, y: 10},
            initialDirection: 'down',
            refreshTime: 270,
        },
        monsters: { 
            refreshTime: 405,
            chasingTime: 17000,
            retreatTime: 5000,
            list: [
                {
                    monster: 1,
                    initialPosition: {x: 2, y: 2},
                    initialDirection: 'down',
                },
                {
                    monster: 2,
                    initialPosition: {x: 2, y: 12},
                    initialDirection: 'down',
                },
                {
                    monster: 3,
                    initialPosition: {x: 12, y: 2},
                    initialDirection: 'down',
                }
            ],
        },
        items: {
            refreshTime: 130,
            list: [
                {
                    item: 1,
                    quantity: 6,
                },
                {
                    item: 2,
                    quantity: 12,
                }
            ]
        }
    }
}