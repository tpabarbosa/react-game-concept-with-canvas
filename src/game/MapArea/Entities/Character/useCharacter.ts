import { useState, useRef} from 'react';
import { Point } from '../../../valueObjects/Position';
import { Layers } from '../../mapLayers';
import * as Directions from '../EntitiesDirections';
import {char} from '../entities';

type Props = {
    name: string;
}

export const useCharacter = ({name}: Props) => {
    const charName = name;
    const [position, setPosition] = useState<Point>(char.initialPosition);
    const [direction, setDirection] = useState<Directions.ValidDirections>(char.initialDirection);
    
    const lastDirection = useRef<Directions.ValidDirections>(Directions.oposite[char.initialDirection]);

    const changeDirection = (newDirection: Directions.ValidDirections) => {
        lastDirection.current = direction;
        setDirection(newDirection);
    }

    const getNewPosition = (
        directions: Directions.RelativePositionDirections, 
        direction: Directions.ValidDirections) => {
        return position.addFromDirection(directions, direction);
    }

    const canMove = (direction: Directions.ValidDirections) => {
        const newPos = getNewPosition(Directions.relative, direction);
            if (Layers[1][newPos.y] !== undefined && 
                Layers[1][newPos.y][newPos.x] !== undefined) {
                return Layers[1][newPos.y][newPos.x] === 0;
            }
        return false;
    }

    const move = () => {
        if (canMove(direction)) {
            setPosition(getNewPosition(Directions.relative, direction));
        }
    }

    const init = () => {
        setPosition(char.initialPosition);
        setDirection(char.initialDirection);
        lastDirection.current = Directions.oposite[char.initialDirection];
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