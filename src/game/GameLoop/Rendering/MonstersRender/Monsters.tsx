import {useEffect} from 'react';

import {MonsterType} from '../../../GameEntities/useMonsters';
import { monstersTiles } from '../../../GameData/Tiles/monstersTiles';

type Props = {
    onLoadMonsters: () => void;
    mustRender: boolean;
    monsters: MonsterType[];
    ctxMonsters: CanvasRenderingContext2D| null 
}

export const Monsters = ({ctxMonsters, onLoadMonsters, monsters, mustRender}: Props) => {
    const ctx = ctxMonsters;

    useEffect(() => {
        if (mustRender && ctx && monsters) {
            ctx.clearRect(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
            monsters.forEach((monster) =>{
                let key: number | string;
                if (monstersTiles.list[monster.monster]?.file) {
                    key = monster.monster;
                } else {
                    key = 'common';
                }
                const img: HTMLImageElement | null = document.querySelector(`#monsters-tile-img-${key}`);
            
                const data = monstersTiles.list[monster.monster]?.directions ?? monstersTiles.common?.directions;
                const direction = data ? data[monster.direction] : undefined;

                const tileSize = monstersTiles.list[monster.monster]?.tilesize ?? monstersTiles.common?.tilesize;
                const scaledTileSize = monstersTiles.list[monster.monster]?.scaledTilesize ?? monstersTiles.common?.scaledTilesize;

                if (img && direction && tileSize && scaledTileSize) {
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
    }, [ctx, onLoadMonsters, mustRender, monsters]);
    

    return (
        <>
        </>
    );
};