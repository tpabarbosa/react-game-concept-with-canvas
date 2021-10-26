import { useState, useEffect, useCallback, useMemo} from 'react';
import { GameState } from "../../../../types/GameState"

import {getRandomInt} from '../../../../../helpers/randomNumbers';
import * as Positions from '../../../../services/positionService';
import { Position } from '../../../../types/Position';
import { QuantityByDirection, RelativePositionByDirections, ValidDirections } from '../../../../types/Directions';
import { getChasingRelativePositions, opositeDirections, relativePositionByDirections } from '../../../../constants/directions';

import { mapDimensions } from '../../../../constants/mapDimensions';
import { mapObjects } from '../../../../constants/mapObjects';
import { phases } from '../../../../constants/phases';
import { monstersData } from '../../../../constants/monstersData';

export type MonsterType = {
    monster: number;
    position: Position;
    direction: ValidDirections;
    comingFrom: ValidDirections;
}

type Props = {
    char: {position: Position, direction: ValidDirections}
    gameState: GameState;
    onMonsterWin: () => void;
}

export const useMonsters = ({char, onMonsterWin, gameState}: Props) => {
    const [monstersList, setMonstersList] = useState<MonsterType[]>([]);
    const phase = useMemo(() => gameState.phase, [gameState.phase]);
    const monsters = useMemo(() => phases[phase.loadingPhase].monsters.list, [phase]);

    //const [isCloseToChar, setIsCloseToChar] = useState(false);
    const [changedChasingMode, setChangedChasingMode] = useState(false)

    //Monsters Chasing Mode
    const [isChasing, setIsChasing] = useState(true);
    const changeChasingMode = (value: boolean) =>{
        setChangedChasingMode(true);
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
                return mapObjects[phases[phase.loadingPhase].objects][newPos.y][newPos.x] === 0;
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
        setChangedChasingMode(false);
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
        setMonstersList(newList);
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


    const checkCollision = useCallback((charPosition: Position) => {
        monstersList.forEach(monster => {
            if (Positions.areEqual(monster.position, charPosition)) {
                onMonsterWin();
            };
        })
    },[monstersList, onMonsterWin])

    useEffect(() => {
        checkCollision(char.position);
    },[char, checkCollision])


    const init = () => {
        setIsChasing(true);
        setChangedChasingMode(false);
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
    }

    return {
        monsters: monstersList,
        init,
        move,
        changeChasingMode,
        isChasing,
        isCloseToChar,
        changedChasingMode
    }
}