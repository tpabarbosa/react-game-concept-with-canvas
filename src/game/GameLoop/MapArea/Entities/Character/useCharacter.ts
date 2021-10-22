import { useState, useRef, useMemo } from 'react';

import { opositeDirections, relativePositionByDirections } from '../../../../constants/directions';

import * as Positions from '../../../../services/positionService';
import { Position } from '../../../../types/Position';
import { ValidDirections } from '../../../../types/Directions';
import { mapObjects } from '../../../../constants/mapObjects';
import { mapDimensions } from '../../../../constants/mapDimensions';
import { phases } from '../../../../constants/phases';

type Props = {
    name: string;
    phase: number;
}

export const useCharacter = ({name, phase}: Props) => {
    const charName = name;
    const char = useMemo(() => phases[phase].char, [phase]);
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
                return mapObjects[phase][newPos.y][newPos.x] === 0;
            }
        return false;
    }

    const move = () => {
        if (canMove(direction)) {
            setPosition(getNewPosition(direction));
        }
    }

    const init = () => {
        setPosition(char.initialPosition);
        setDirection(char.initialDirection);
        lastDirection.current = opositeDirections[char.initialDirection];
    };

    return {
        position,
        name: charName,
        direction,
        changeDirection,
        init,
        move
    }
}