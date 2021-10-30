import { Dispatch, SetStateAction, useState, useRef, useMemo } from 'react';

import { opositeDirections, relativePositionByDirections } from '../GameData/directionsData';

import * as Positions from '../helpers/PositionAndDirection/positionService';
import { Position } from '../helpers/PositionAndDirection/PositionTypes';
import { ValidDirections } from '../helpers/PositionAndDirection/DirectionsType';
import { mapObjects } from '../GameData/mapObjectsData';
import { mapDimensions } from '../GameData/mapDimensionsData';
import { levels } from '../GameData/levelsData';

export type CharType= {
    position: Position,
    name: string,
    direction: ValidDirections,
    changeDirection: (newDirection: ValidDirections) => void,
    init: (level: number) => void,
    move: () => boolean
    setName: (name: string) => void
    updateRequired: boolean,
    setUpdateRequired: Dispatch<SetStateAction<boolean>>
}

export const useCharacter = ():CharType => {
    const [name, setName] = useState('Player');
    const [level, setLevel] = useState(1);
    const char = useMemo(() => levels[level].char, [level]);
    const [updateRequired, setUpdateRequired] = useState(false);
    const [position, setPosition] = useState<Position>(char.initialPosition);
    const [direction, setDirection] = useState<ValidDirections>(char.initialDirection);
    
    const lastDirection = useRef<ValidDirections>(opositeDirections[char.initialDirection]);

    const changeDirection = (newDirection: ValidDirections) => {
        lastDirection.current = direction;
        setDirection(newDirection);
    }

    const getNewPosition = (direction: ValidDirections) => {
        return Positions.addFromDirection(position, direction,relativePositionByDirections);
    }

    const canMove = (direction: ValidDirections) => {
        const newPos = getNewPosition(direction);
            if (newPos.x > 0 && newPos.y > 0 &&
                mapDimensions.cols - 1 > newPos.x && 
                mapDimensions.rows - 1 > newPos.y) {
                return mapObjects[levels[level].objects][newPos.y][newPos.x] === 0;
            }
        return false;
    }

    const move = () => {
        if (canMove(direction)) {
            setPosition(getNewPosition(direction));
            setUpdateRequired(true);
            return true;
        } 
        return false;
    }

    const init = (levelToRender: number) => {
        setLevel(levelToRender);
        setPosition(char.initialPosition);
        setDirection(char.initialDirection);
        lastDirection.current = opositeDirections[char.initialDirection];
    };

    return {
        position,
        name,
        direction,
        changeDirection,
        init,
        move,
        setName,
        updateRequired,
        setUpdateRequired
    }
}