import { useState } from 'react';

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
}

export const MapArea = ({gameState, gameStateDispatcher, char, activeMonsters, items, itemsFrame}: Props & GameProps) => {

    const [mustRenderMap, setMustRenderMap] = useState(true);
    const [mustRenderItems, setMustRenderItems] = useState(true);
    const [mustRenderMonsters, setMustRenderMonsters] = useState(true);
    const [mustRenderCharacter, setMustRenderCharacter] = useState(true);

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

    return (
        <>
            <>
                {/* <Grid scale={scale}> */}
                    <Map 
                        onLoadMap={onLoadMap} 
                        mustRender={mustRenderMap}
                        background={phases[gameState.phase.loadingPhase].background}
                        objects={phases[gameState.phase.loadingPhase].objects}
                    />    
                {/* </Grid> */}
            </>

            {gameState.imagesLoaded === 'MAP'  &&
                <Items 
                    items={items} 
                    onLoadItems={onLoadItems}
                    frame={itemsFrame}  
                    mustRender={mustRenderItems}
                />
            }

            {gameState.imagesLoaded === 'ITEMS' && 
                <Character 
                    direction={char.direction} 
                    position={char.pos} 
                    onLoadCharacter={onLoadCharacter}
                    mustRender={mustRenderCharacter}
                />
            }

            {gameState.imagesLoaded === 'CHARACTER' && 
                <Monsters 
                    activeMonsters={activeMonsters}
                    onLoadMonsters={onLoadMonsters}
                    mustRender={mustRenderMonsters}
                />
            }
            

        </>
    )
}