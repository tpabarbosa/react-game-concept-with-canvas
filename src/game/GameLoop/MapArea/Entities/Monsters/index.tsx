import {useEffect, useContext} from 'react';

import CanvasContext from '../../../CanvasContext';

import {MonsterType} from './useMonsters';
import { monsters } from '../../../../constants/monstersTiles';

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
            activeMonsters.forEach((monster) =>{
                let key: number | string;
                if (monsters.list[monster.monster]?.file) {
                    key = monster.monster;
                } else {
                    key = 'common';
                }
                const img: HTMLImageElement | null = document.querySelector(`#monsters-tile-img-${key}`);
               
                const data = monsters.list[monster.monster]?.directions ?? monsters.common?.directions;
                const direction = data ? data[monster.direction] : undefined;

                const tileSize = monsters.list[monster.monster]?.tilesize ?? monsters.common?.tilesize;
                const scaledTileSize = monsters.list[monster.monster]?.scaledTilesize ?? monsters.common?.scaledTilesize;

                if (img && ctx && direction && tileSize && scaledTileSize) {
                    ctx.drawImage(
                        img,
                        direction.x * tileSize,
                        direction.y * tileSize,
                        tileSize,
                        tileSize,
                        monster.position.x * scaledTileSize,
                        monster.position.y * scaledTileSize,
                        scaledTileSize,
                        scaledTileSize,
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