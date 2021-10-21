import {useEffect, useContext} from 'react';

import CanvasContext from '../../../contexts/CanvasContext';
import {monsters, TileData} from '../entities';
import {mapDimensions} from '../../mapDimensions';
import {MonsterType} from './useMonsters';

type Props = {
    onLoadMonsters: () => void;
    scale: number;
    mustRender: boolean;
    activeMonsters: MonsterType[];
}

export const Monsters = ({onLoadMonsters, activeMonsters, scale, mustRender}: Props) => {
    const ctx = useContext(CanvasContext);

    useEffect(() => {
        if (mustRender) {
            activeMonsters.forEach((monster, index) =>{
                let key: number | string;
                if (monsters.monstersList[index].tileData) {
                    key = index;
                } else {
                    key = 'common';
                }
                const img: HTMLImageElement | null = document.querySelector(`#monsters-tile-img-${key}`);
                if (img && ctx) {
                    const data = monsters.monstersList[index].tileData ?? monsters.commonData as TileData; 
                    
                    ctx.drawImage(
                        img,
                        data.imagePositions[monster.direction].x * data.tileSize,
                        data.imagePositions[monster.direction].y * data.tileSize,
                        data.tileSize,
                        data.tileSize,
                        monster.position.x * mapDimensions.tileSize*scale ,
                        monster.position.y * mapDimensions.tileSize*scale,
                        data.tileSize*scale,
                        data.tileSize*scale,
                    );
                }
            })
            onLoadMonsters();
        };    
    }, [ctx, onLoadMonsters, mustRender, activeMonsters, scale]);
    

    return (
        <>
        </>
    );
};