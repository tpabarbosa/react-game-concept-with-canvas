import { useState, useCallback, useMemo, useRef, Dispatch, SetStateAction} from 'react';

import {getRandomInt} from '../helpers/randomNumbers';
import * as Positions from '../helpers/PositionAndDirection/positionService';
import { Position } from '../helpers/PositionAndDirection/PositionTypes';
import { QuantityByDirection, RelativePositionByDirections, ValidDirections } from '../helpers/PositionAndDirection/DirectionsType';
import { opositeDirections, relativePositionByDirections } from '../GameData/directionsData';

import { mapDimensions } from '../GameData/mapDimensionsData';
import { mapObjects } from '../GameData/mapObjectsData';
import { levels } from '../GameData/levelsData';
import { getChasingRelativePositions, monstersData } from '../GameData/monstersData';

import { CharType } from './useCharacter';

export type MonsterType = {
    monster: number;
    position: Position;
    direction: ValidDirections;
    comingFrom: ValidDirections;
}

export type MonstersType = {
    monsters: MonsterType[],
    init: (levelToRender: number) => void,
    move: () => void,
    changeChasingMode: (value: boolean) => void,
    changedChasingMode: boolean
    isChasing: boolean,
    isCloseToChar: () => boolean,
    checkCollision: () => boolean;
    updateRequired: boolean,
    setUpdateRequired: Dispatch<SetStateAction<boolean>>,
    isInited: boolean;
    clean: () => void;
}

export const useMonsters = (char: CharType): MonstersType => {
    const [updateRequired, setUpdateRequired] = useState(false);
    const [monstersList, setMonstersList] = useState<MonsterType[]>([]);
    const [level, setLevel] = useState(1);
    const monsters = useMemo(() => levels[level].monsters.list, [level]);

    const isInited = useRef(false);
    //const [isCloseToChar, setIsCloseToChar] = useState(false);
    const changedChasingMode = useRef(false)

    //Monsters Chasing Mode
    const [isChasing, setIsChasing] = useState(true);
    const changeChasingMode = (value: boolean) =>{
        changedChasingMode.current=true;
        setIsChasing(value);
    }

    const getNewPosition = (position: Position,
        directions: RelativePositionByDirections, 
        direction: ValidDirections) => {
        return Positions.addFromDirection(position, direction, directions);
    }

    const canMove = (position: Position, direction: ValidDirections) => {
        const newPos = getNewPosition(position, relativePositionByDirections, direction);
            if (newPos.x > 0 && newPos.y > 0 &&
                mapDimensions.cols - 1 > newPos.x && 
                mapDimensions.rows - 1 > newPos.y) {
                return mapObjects[levels[level].objects][newPos.y][newPos.x] === 0;
            }
        return false;
    }

    const getDistancesByDirection = (monster: MonsterType, index: number):QuantityByDirection => {
        let distances: QuantityByDirection = {
            up: -1, down: -1, left: -1, right: -1}

        Object.keys(distances).forEach((dir) => {
            let direction = dir as ValidDirections;
            
            if (direction !== monster.comingFrom && canMove(monster.position, direction)) {
            let target: Position;
            if (!isChasing) {
                const m = Object.values(monsters).find((m) => m.monster === monster.monster);
                target =  m ? m.initialPosition : {x: 2, y:2};
            } else {
                let directions = getChasingRelativePositions(monstersData[index].chasingType); 

                target = Positions.addFromDirection(char.position, char.direction, directions);
            }
            distances[direction] = Positions.getDistance(target, getNewPosition(monster.position, relativePositionByDirections, direction));
            }
        })
        return distances;
    }

    const getDirectionWithMinValue = (distances: QuantityByDirection) => {
        const array = Object.values(distances);
        return Math.min(...array.filter(value => value !== -1))
    }

    const move = () => {
        const newList: MonsterType[]=[];
        
        monstersList.forEach((monster) => {
            const index = monster.monster;
            const distances = getDistancesByDirection(monster, index);

            let final: ValidDirections[]=[];
            const min = getDirectionWithMinValue(distances);

            Object.entries(distances).forEach((value) => {
                if(value[1] === min) {
                    final.push(value[0] as ValidDirections);
                }
            });
            
            let moveTo: ValidDirections 
            if(final.length===0) {
                moveTo = monster.comingFrom;
            } else if (final.length === 1) {
                moveTo = final[0];
            } else {
                const index = getRandomInt(0, final.length-1);
                moveTo = final[index];
            }

            newList.push({
                monster: index,
                position: getNewPosition(monster.position, relativePositionByDirections, moveTo),
                comingFrom: opositeDirections[moveTo],
                direction: moveTo
            });
        });
        changedChasingMode.current = false;
        setMonstersList(newList);
        setUpdateRequired(true);
    }

    const isCloseToChar = useCallback(() => {
        let isClose = false;
        monstersList.forEach(monster => {
            if (Positions.getDistance(monster.position, char.position) < 2.5) {
                isClose = true;
            } 
        })
        return isClose;
    }, [char.position, monstersList])


    const checkCollision = useCallback(() => {
        let collision = false;
        monstersList.forEach(monster => {
            if (Positions.areEqual(monster.position, char.position)) {
                collision = true;
            };
        })
        return collision;
    },[monstersList, char.position])


    const init = (levelToRender: number) => {
        setLevel(levelToRender);
        if (isInited.current === false && level===levelToRender) {
            setIsChasing(true);
            changedChasingMode.current = false;
            const newList: MonsterType[]=[];
            monsters.forEach((monster) => {
                newList.push({
                    monster: monster.monster,
                    position: monster.initialPosition,
                    comingFrom: opositeDirections[monster.initialDirection],
                    direction: monster.initialDirection
                });
            })
            setMonstersList(newList);
            isInited.current= true;
        }
    }

    return {
        monsters: monstersList,
        init,
        move,
        changeChasingMode,
        isChasing,
        isCloseToChar,
        changedChasingMode: changedChasingMode.current,
        checkCollision,
        updateRequired,
        setUpdateRequired,
        isInited: isInited.current, 
        clean: ()=> isInited.current=false
    }
}