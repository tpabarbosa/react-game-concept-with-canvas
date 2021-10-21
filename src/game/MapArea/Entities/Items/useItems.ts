import { useEffect, useState, useCallback, useMemo } from 'react';
import { Point } from '../../../valueObjects/Position';
import { Layers } from '../../mapLayers';
import { mapDimensions } from '../../mapDimensions';
import {char, monsters} from '../entities';
import {itemsTileImages} from '../itemsTileImages';
import {getRandomInt} from '../random';
import {GameState} from '../../../types/GameStatus';

export type ItemType = {
    wasCollected: boolean;
    position: Point;
    item: number;
    type: number;
}

type Props = {
    onCollectedAll: () => void;
    gameState: GameState;
}

export const useItems = ({ onCollectedAll, gameState}: Props) => {
    const [collected, setCollected] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsList, setItemsList] = useState<ItemType[]>([]);
    const [itemsFrame, setItemsFrame] = useState<number[]>([4]);

    const audio = useMemo(() => new Audio('assets/audios/coin.mp3'), []);

    const onCollected = useCallback(() => {
        audio.play();
        setCollected(collected + 1);
    }, [collected, audio]);

    useEffect(() => {
        if(collected===totalItems && collected !== 0) {
            onCollectedAll();
        }
    }, [collected, totalItems, onCollectedAll]);

    const canBePlacedAt = (position: Point, itemsInList: ItemType[]) => {
        let canBePlaced = false;
        if (Layers[1][position.y][position.x] === 0 && 
            !position.isEqual(char.initialPosition)
            ) {
                canBePlaced = true;
                itemsInList.forEach(item => {
                    if(position.isEqual(item.position)) {
                        canBePlaced = false;
                    }
                });

                monsters.monstersList.forEach(monster => {
                    if(position.isEqual(monster.initialPosition)) {
                        canBePlaced = false;
                    }
                })
            return canBePlaced;
        }
        return canBePlaced;
    };
    

    const createObjects = useCallback((quantity)=> {
        const items: ItemType[] = [];
        let itemtype: number =1;
        for (let i=0; i<quantity; i++) {
            let position: Point;
            do {
                const x = getRandomInt(0, mapDimensions.cols - 1);
                const y = getRandomInt(0, mapDimensions.rows - 1);
                position = new Point(x, y);
                
            } while (!canBePlacedAt(position, items));
            const item: ItemType = {
                wasCollected: false,
                position,
                item: i+1,
                type: itemtype,
            }
            itemtype = itemtype===1 ? 2 : 1;
            items.push(item);
        }
        
        setItemsList(items);
        setTotalItems(quantity);
    }, [setTotalItems, setItemsList]);

    const checkCollected = (charPosition: Point) => {
        if (gameState.status==='RUNNING' && collected!==totalItems) {
            const newList = itemsList.map((item)=>{
                if(!item.wasCollected && item.position.isEqual(charPosition)) {
                    item.wasCollected = true;
                    onCollected();
                }
                return item;
            });
            setItemsList(newList);
        }
    }

    const initItemsFrame = useCallback(() => {
        const frames: number[] = [];
        const totalitems = Object.keys(itemsTileImages).length;
        for (let i=0; i < totalitems ; i++) {
            frames.push(0);
        }; 
        setItemsFrame(frames);
    }, [])

    const init = (quantity: number = 20) => {
        createObjects(quantity);
        setCollected(0); 
        initItemsFrame();
    };

    const animate = () => {
        let frames:number[]=[];
        itemsFrame.forEach((item,index) => {
            let frame = itemsFrame[index]+1;
            if (frame>itemsTileImages[String(index+1)].frames.length-1) {
                frame=0;
            }
            frames.push(frame);
        })
        setItemsFrame(frames);
    }

    return {
        items: itemsList,
        itemsFrame,
        init,
        animate,
        checkCollected
    }
}