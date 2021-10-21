import { useEffect, useState } from "react";
import { GameState, GameStateActions } from "../types/GameStatus"
import { MapBuffer } from './MapBuffer';
import { ItemsBuffer } from './ItemsBuffer';
import { MonstersBuffer } from './MonstersBuffer';
import { CharacterBuffer } from './CharacterBuffer';
import { mapTileImages } from '../MapArea/mapTileImages';
import {itemsTileImages} from '../MapArea/Entities/itemsTileImages';
import { monsters} from '../MapArea/Entities/entities';

type Props = {
    gameState: GameState,
    gameStateDispatcher: React.Dispatch<GameStateActions>,
}

export const Buffering = ({gameState, gameStateDispatcher}: Props) => {
    const [mapBuffered, setMapBuffered] = useState<string[]>([]);
    const [monstersBuffered, setMonstersBuffered] = useState<string[]>([]);
    const [itemsBuffered, setItemsBuffered] = useState<string[]>([]);
    const [characterBuffered, setCharacterBuffered] = useState<string[]>([])

    const bufferMapImage = (image: string) => {
        setMapBuffered([...mapBuffered, image]);
    };

    const bufferItemImage = (image: string) => {
        setItemsBuffered([...itemsBuffered, image]);
    };

    const bufferMonsterImage = (image: string) => {
        setMonstersBuffered([...monstersBuffered, image]);
    };

    const bufferCharacterImage = (image: string) => {
        setCharacterBuffered([...characterBuffered, image]);
    };

    useEffect(() => {
        if(mapBuffered.length === Object.keys(mapTileImages).length && gameState.imagesBuffered === 'NO_IMAGES') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'MAP'})
        }
        if(itemsBuffered.length === Object.keys(itemsTileImages).length && gameState.imagesBuffered === 'MAP') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'ITEMS'})
        }
        if(characterBuffered.length === 1 && gameState.imagesBuffered === 'ITEMS') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'CHARACTER'})
        }
        if(monstersBuffered.length === monsters.totalImages && gameState.imagesBuffered === 'CHARACTER') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'MONSTERS'})
        }
        if(gameState.imagesBuffered === 'MONSTERS') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'ALL_IMAGES'})
        }
    },[mapBuffered, itemsBuffered, characterBuffered, monstersBuffered, gameStateDispatcher, gameState])

    return(
        <>
            <MapBuffer onLoadImage={bufferMapImage}/>
            <ItemsBuffer onLoadImage={bufferItemImage}/>
            <CharacterBuffer onLoadImage={bufferCharacterImage}/>
            <MonstersBuffer onLoadImage={bufferMonsterImage}/>
        </>
    )

}