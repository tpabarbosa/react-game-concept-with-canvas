import { useEffect, useState, useContext } from 'react';
import CanvasContext from "../CanvasContext";
import { GameProps } from '../../types/GameState';

import { Grid } from './Grid';
import { Map } from './Map';

import {Character} from './Entities/Character';

import {Monsters} from './Entities/Monsters';
import {MonsterType} from './Entities/Monsters/useMonsters';

import {ItemType} from './Items/useItems';
import { Items } from './Items';

import { Position } from '../../types/Position';
import { ValidDirections } from '../../types/Directions';
import { phases } from '../../constants/phases';

type Props = {
    char: {direction: ValidDirections, pos: Position};
    activeMonsters: MonsterType[];
    items: ItemType[];
    itemsFrame: number[];
    ctxMap: CanvasRenderingContext2D| null 
}

export const MapArea = ({ctxMap, gameState, gameStateDispatcher, char, activeMonsters, items, itemsFrame}: Props & GameProps) => {

    const [mustRenderMap, setMustRenderMap] = useState(true);
    const [mustRenderItems, setMustRenderItems] = useState(true);
    const [mustRenderMonsters, setMustRenderMonsters] = useState(true);
    const [mustRenderCharacter, setMustRenderCharacter] = useState(true);

    const ctx = useContext(CanvasContext);

    const onLoadMap = (value: boolean = true) => {
        if (value) {
            gameStateDispatcher({type: 'imagesLoaded', value: 'MAP'});
            setMustRenderMap(false);
        }
    }

    const onLoadItems = (value: boolean = true) => {
        if (value) {
            gameStateDispatcher({type: 'imagesLoaded', value: 'ITEMS'});
            setMustRenderItems(false);
        }
    }

    const onLoadCharacter = (value: boolean = true) => {
        if (value) {
            gameStateDispatcher({type: 'imagesLoaded', value: 'CHARACTER'});
            setMustRenderCharacter(false);
        }
    };

    const onLoadMonsters = (value: boolean = true) => {
        if (value) {
            gameStateDispatcher({type: 'imagesLoaded', value: 'MONSTERS'});
            setMustRenderMonsters(false);
        }
        
    };

    useEffect(() => {
        
        if(gameState.isMapVisible && !mustRenderMap) {
            ctx && ctx.clearRect(0,0,ctx.canvas.clientWidth,ctx.canvas.clientHeight); 
            gameStateDispatcher({type: 'imagesLoaded', value: 'MAP'});
            setMustRenderItems(true);
            setMustRenderCharacter(true);
            setMustRenderMonsters(true);
            
        }
    },[ctx,  gameState.isMapVisible, mustRenderMap,gameStateDispatcher])

 
    return (
        <>
            <>
                {/* <Grid scale={scale}> */}
                {/* {gameState.imagesLoaded ==='NO_IMAGES' &&
                    <Map 
                        ctxMap={ctxMap}
                        onLoadMap={onLoadMap} 
                        mustRender={mustRenderMap}
                        background={phases[gameState.phase.loadingPhase].background}
                        objects={phases[gameState.phase.loadingPhase].objects}
                    />    */}
                {/* }  */}
                {/* </Grid> */}
            </>

            {/* {gameState.isMapVisible && gameState.imagesLoaded === 'MAP'  &&
                <Items 
                    items={items} 
                    onLoadItems={onLoadItems}
                    frame={itemsFrame}  
                    mustRender={mustRenderItems}
                />
            } */}
            

            {/* {gameState.isMapVisible && gameState.imagesLoaded === 'ITEMS' && 
                <Character 
                    direction={char.direction} 
                    position={char.pos} 
                    onLoadCharacter={onLoadCharacter}
                    mustRender={mustRenderCharacter}
                />
            } */}

            {/* {gameState.isMapVisible && gameState.imagesLoaded === 'CHARACTER' && 
                <Monsters 
                    activeMonsters={activeMonsters}
                    onLoadMonsters={onLoadMonsters}
                    mustRender={mustRenderMonsters}
                />
            } */}
            

        </>
    )
}