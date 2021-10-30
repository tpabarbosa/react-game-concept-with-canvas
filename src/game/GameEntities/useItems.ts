import { useState, useCallback, useMemo, Dispatch, SetStateAction, useRef } from 'react';

import { mapDimensions } from '../GameData/mapDimensionsData';
import {itemsTiles} from '../GameData/Tiles/itemsTiles';
import {getRandomInt} from '../helpers/randomNumbers';
import * as Positions from '../helpers/PositionAndDirection/positionService';
import { Position } from '../helpers/PositionAndDirection/PositionTypes';
import { levels } from '../GameData/levelsData';
import { mapObjects } from '../GameData/mapObjectsData';
import { itemsData } from '../GameData/ItemsData';

export type ItemType = {
    wasCollected: boolean;
    position: Position;
    item: number;
    type: number;
    value: number;
}

export type ItemsType = {
    items: ItemType[],
    itemsFrame: number[],
    points: number;
    init: (levelToRender: number) => void,
    animate: () => void,
    checkCollected: (charPositon: Position) => boolean,
    checkCollectedAll: () => boolean,
    updateRequired: boolean,
    setUpdateRequired: Dispatch<SetStateAction<boolean>>,
    tileData: any[];
    clean: ()=> void
    isInited: boolean;
} 

export const useItems = ():ItemsType => {
    const [updateRequired, setUpdateRequired] = useState(false);
    const [collected, setCollected] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsList, setItemsList] = useState<ItemType[]>([]);
    const [itemsFrame, setItemsFrame] = useState<number[]>([4]);
    const [tileData, setTileData] = useState<any[]>([]);
    const [points, setPoints] = useState<number>(0);

    const [level, setLevel] = useState(1);
    const items = useMemo(() => levels[level].items.list, [level]);
    const char = useMemo(() => levels[level].char, [level]);
    const monsters = useMemo(() => levels[level].monsters.list, [level]);
    const isInited = useRef(false);

    const canBePlacedAt = useCallback((position: Position, itemsInList: ItemType[]) => {
        let canBePlaced = false;
        if (mapObjects[levels[level].objects][position.y][position.x] === 0 && 
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
    }, [char.initialPosition, monsters, level]);
    

    const createTileData = useCallback((item: {item:number, quantity:number}) => {
        let key: number | string;
        if (itemsTiles.list[item.item].file) {
            key = item.item;
        } else {
            key = 'common';
        }
        // const img: HTMLImageElement | null = document.querySelector(`#items-tile-img-${key}`);
        const img = `#items-tile-img-${key}`;

        const tileSize = itemsTiles.list[item.item].tilesize ?? itemsTiles.common?.tilesize;
        const scaledTileSize = itemsTiles.list[item.item].scaledTilesize ?? itemsTiles.common?.scaledTilesize;

        let frames = itemsTiles.list[item.item].frames;
        let framesPos:Position[] =[];
        if (frames && tileSize) {
            frames.forEach(frame => {
                framesPos.push({x: frame.x * tileSize, y: frame.y* tileSize})
            })
        }

        const toReturn = {
            img,
            framesPos,
            tileSize,
            scaledTileSize
        }
        return  toReturn;
    },[])


    const createObjects = useCallback(()=> {
        const newItemsList: ItemType[] = [];
        let totalItems=0;
        const tileData: any = [];
        items.forEach((item)=> { 
            
            tileData.push(createTileData(item));

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
        setTileData(tileData);
        setItemsList(newItemsList);
        setTotalItems(totalItems);
    }, [setTotalItems, setItemsList, canBePlacedAt, items, createTileData]);

    const checkCollected = useCallback((charPosition: Position) => {
        let pointsCollected = 0;
        
        if (collected!==totalItems) {
            const newList = itemsList.map((item)=>{
                if(!item.wasCollected && Positions.areEqual(item.position,charPosition)) {
                    pointsCollected = item.value;
                    item.wasCollected = true;
                    setCollected(collected+1);
                }
                return item;
            });
            setItemsList(newList);
        }
        setPoints(pointsCollected);
        return !!pointsCollected;
        
    }, [collected, itemsList, totalItems]);

    const checkCollectedAll = useCallback(() => {
        return collected===totalItems && collected !== 0;
    },[collected, totalItems]);

    const initItemsFrame = useCallback(() => {
        const frames: number[] = [];
        const totalitems = Object.keys(items).length;
        for (let i=0; i < totalitems ; i++) {
            frames.push(0);
        }; 
        setItemsFrame(frames);
    }, [items])


    const init = (levelToRender: number) => {
        setLevel(levelToRender);
        if (isInited.current === false && level===levelToRender) {
            setPoints(0);
            createObjects();
            setCollected(0); 
            initItemsFrame();
            isInited.current = true;
        }
        
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
        setUpdateRequired(true);
    }

    const clean = () => {
        isInited.current = false;}

    return {
        items: itemsList,
        itemsFrame,
        init,
        animate,
        points,
        checkCollected,
        checkCollectedAll,
        updateRequired,
        setUpdateRequired,
        tileData,
        clean,
        isInited: isInited.current
    }
}