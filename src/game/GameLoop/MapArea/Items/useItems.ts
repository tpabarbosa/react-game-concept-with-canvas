import { useEffect, useState, useCallback, useMemo } from 'react';

import { mapDimensions } from '../../../constants/mapDimensions';

import {itemsTiles} from '../../../constants/itemsTiles';
import {getRandomInt} from '../../../../helpers/randomNumbers';
import {GameState} from '../../../types/GameState';
import * as Positions from '../../../services/positionService';
import { Position } from '../../../types/Position';

import { phases } from '../../../constants/phases';
import { mapObjects } from '../../../constants/mapObjects';
import { itemsData } from '../../../constants/ItemsData';

export type ItemType = {
    wasCollected: boolean;
    position: Position;
    item: number;
    type: number;
    value: number;
}

type Props = {
    onCollectedAll: () => void;
    updateCollected: (toAdd: number) => void;
    gameState: GameState;
}

export const useItems = ({ updateCollected, onCollectedAll, gameState}: Props) => {
    const [collected, setCollected] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsList, setItemsList] = useState<ItemType[]>([]);
    const [itemsFrame, setItemsFrame] = useState<number[]>([4]);

    const phase = useMemo(() => gameState.phase, [gameState.phase]);
    const items = useMemo(() => phases[phase.loadingPhase].items.list, [phase]);
    const char = useMemo(() => phases[phase.loadingPhase].char, [phase]);
    const monsters = useMemo(() => phases[phase.loadingPhase].monsters.list, [phase]);
    

    const onCollected = useCallback(() => {
        setCollected(collected + 1);
    }, [collected]);

    useEffect(() => {
        if(collected===totalItems && collected !== 0) {
            onCollectedAll();
        }
    }, [collected, totalItems, onCollectedAll]);

    const canBePlacedAt = useCallback((position: Position, itemsInList: ItemType[]) => {
        let canBePlaced = false;
        if (mapObjects[phases[phase.loadingPhase].objects][position.y][position.x] === 0 && 
            !Positions.areEqual(position,char.initialPosition)
            ) {
                canBePlaced = true;
                itemsInList.forEach(item => {
                    if(Positions.areEqual(position, item.position)) {
                        canBePlaced = false;
                    }
                });

                monsters.forEach(monster => {
                    if(Positions.areEqual(position, monster.initialPosition)) {
                        canBePlaced = false;
                    }
                })
            return canBePlaced;
        }
        return canBePlaced;
    }, [char.initialPosition, monsters, phase.loadingPhase]);
    

    const createObjects = useCallback(()=> {
        const newItemsList: ItemType[] = [];
        let totalItems=0;
        items.forEach(item => { 
            for (let i=0; i<item.quantity; i++) {
                let position: Position;
                do {
                    const x = getRandomInt(0, mapDimensions.cols - 1);
                    const y = getRandomInt(0, mapDimensions.rows - 1);
                    position = {x, y};
                    
                } while (!canBePlacedAt(position, newItemsList));
                const newItem: ItemType = {
                    wasCollected: false,
                    position,
                    item: i+1,
                    type: item.item,
                    value: itemsData[item.item].value,
                }
                newItemsList.push(newItem);
            }
            totalItems+=item.quantity;
        })

        setItemsList(newItemsList);
        setTotalItems(totalItems);
    }, [setTotalItems, setItemsList, canBePlacedAt, items]);

    const checkCollected = (charPosition: Position) => {
        if (gameState.status==='RUNNING' && collected!==totalItems) {
            const newList = itemsList.map((item)=>{
                if(!item.wasCollected && Positions.areEqual(item.position,charPosition)) {
                    item.wasCollected = true;
                    onCollected();
                    updateCollected(item.value);
                }
                return item;
            });
            setItemsList(newList);
        }
    }

    const initItemsFrame = useCallback(() => {
        const frames: number[] = [];
        const totalitems = Object.keys(items).length;
        for (let i=0; i < totalitems ; i++) {
            frames.push(0);
        }; 
        setItemsFrame(frames);
    }, [items])

    const init = (quantity: number = 20) => {
        createObjects();
        setCollected(0); 
        initItemsFrame();
    };

    const animate = () => {
        let frames:number[]=[];
        items.forEach((item, index) => {
            let frame = itemsFrame[index]+1;
            let itemFrames = itemsTiles.list[item.item].frames
            if (itemFrames && frame>itemFrames.length-1) {
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
        checkCollected,
    }
}