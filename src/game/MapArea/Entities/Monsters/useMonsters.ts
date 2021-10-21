import { useState, useEffect, useCallback, useMemo } from 'react';
import { GameState } from "../../../types/GameStatus"
import { Point } from "../../../valueObjects/Position"
import * as Directions from '../EntitiesDirections';
import {monsters} from '../entities';
import { Layers } from '../../mapLayers';
import { minDistance } from '../distance';
import {getRandomInt} from '../random';

export type MonsterType = {
    position: Point;
    direction: Directions.ValidDirections;
    comingFrom: Directions.ValidDirections;
}

type Props = {
    char: {position: Point, direction: Directions.ValidDirections}
    gameState: GameState;
    onMonsterWin: () => void;
}

export const useMonsters = ({char, onMonsterWin, gameState}: Props) => {
    const [monstersList, setMonstersList] = useState<MonsterType[]>([]);
    const audio = useMemo(() => new Audio('assets/audios/monster.mp3'), []);
    const audioChasing = useMemo(() => new Audio('assets/audios/chasing.mp3'), []);

    //Monsters Chasing Mode
    const [isChasing, setIsChasing] = useState(true);
    const changeChasingMode = (value: boolean) =>{
        audioChasing.play();
        setIsChasing(value);
    }

    const getNewPosition = (
        monster: MonsterType,
        directions: Directions.RelativePositionDirections, 
        direction: Directions.ValidDirections) => {
        return monster.position.addFromDirection(directions, direction);
    }

    const canMove = (monster: MonsterType, direction: Directions.ValidDirections) => {
        const newPos = getNewPosition(monster, Directions.relative, direction);
            if (Layers[1][newPos.y] !== undefined && 
                Layers[1][newPos.y][newPos.x] !== undefined) {
                return Layers[1][newPos.y][newPos.x] === 0;
            }
        return false;
    }

    const getDistancesByDirection = (monster: MonsterType, index: number):Directions.Distances => {
        let distances: Directions.Distances = {
            up: -1, down: -1, left: -1, right: -1}

        Object.keys(distances).forEach((dir) => {
            let direction = dir as Directions.ValidDirections;
            
            if (direction !== monster.comingFrom && canMove(monster, direction)) {
            let target: Point;
            if (!isChasing) {
                target = monsters.monstersList[index].initialPosition;
            } else {
                const directions = monsters.monstersList[index].chasingRelativePositions;
                target = char.position.addFromDirection(directions, char.direction);
            }
            distances[direction] = Point.getDistance(target, getNewPosition(monster, Directions.relative, direction));
            }
        })
        return distances;
    }

    const move = () => {
        const newList: MonsterType[]=[];
        monstersList.forEach((monster, index) => {
            const distances = getDistancesByDirection(monster, index);

            let final: Directions.ValidDirections[]=[];
            const min = minDistance(distances);

            Object.entries(distances).forEach((value) => {
                if(value[1] === min) {
                    final.push(value[0] as Directions.ValidDirections);
                }
            });
            
            let moveTo: Directions.ValidDirections 
            if(final.length===0) {
                moveTo = monster.comingFrom;
            } else if (final.length === 1) {
                moveTo = final[0];
            } else {
                const index = getRandomInt(0, final.length-1);
                moveTo = final[index];
            }

            newList.push({
                position: getNewPosition(monster, Directions.relative, moveTo),
                comingFrom: Directions.oposite[moveTo],
                direction: moveTo
            });
        });
        setMonstersList(newList);
    }

    useEffect(() => {
        if(gameState.status === 'RUNNING') {
            monstersList.forEach(monster => {
                if (Point.getDistance(monster.position, char.position) < 2.5) {
                    audio.play();
                }
            })
        }
    }, [monstersList, char, audio, gameState.status])

    const checkCollision = useCallback((charPosition: Point) => {
        monstersList.forEach(monster => {
            if (monster.position.isEqual(charPosition)) {
                onMonsterWin();
            };
        })
    },[monstersList, onMonsterWin])

    useEffect(() => {
        checkCollision(char.position);
    },[char, checkCollision])


    const init = () => {
        setIsChasing(true);
        const newList: MonsterType[]=[];
        monsters.monstersList.forEach((monster) => {
            newList.push({
                position: monster.initialPosition,
                comingFrom: Directions.oposite[monster.initialDirection],
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
        isChasing
    }
}