import { useEffect, useState } from "react";
import { GameProps } from "../../types/GameStatus"
import { MapBuffer } from './MapBuffer';
import { ItemsBuffer } from './ItemsBuffer';
import { MonstersBuffer } from './MonstersBuffer';
import { CharacterBuffer } from './CharacterBuffer';

import {itemsTiles} from '../../constants/itemsTiles';

import { totalImages } from "../../helpers/tileImages";
import { mapTiles } from "../../constants/mapTiles";
import { monsters } from "../../constants/monstersTiles";
import { characters } from "../../constants/charactersTiles";


type Props = {
    onImagesBuffered: () => void,
}

export const Buffering = ({gameState, gameStateDispatcher, onImagesBuffered}: GameProps & Props) => {
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
        if(mapBuffered.length === totalImages(mapTiles) && gameState.imagesBuffered === 'NO_IMAGES') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'MAP'})
        }
        if(itemsBuffered.length === totalImages(itemsTiles) && gameState.imagesBuffered === 'MAP') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'ITEMS'})
        }
        if(characterBuffered.length === totalImages(characters) && gameState.imagesBuffered === 'ITEMS') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'CHARACTER'})
        }

        if(monstersBuffered.length === totalImages(monsters) && gameState.imagesBuffered === 'CHARACTER') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'MONSTERS'})
        }
        if(gameState.imagesBuffered === 'MONSTERS') {
            gameStateDispatcher({type: 'imagesBuffered', value: 'ALL_IMAGES'});
            onImagesBuffered();
        }
    },[mapBuffered, itemsBuffered, characterBuffered, monstersBuffered, gameStateDispatcher, gameState, onImagesBuffered])

    return(
        <>
            <MapBuffer onLoadImage={bufferMapImage}/>
            <ItemsBuffer onLoadImage={bufferItemImage}/>
            <CharacterBuffer onLoadImage={bufferCharacterImage}/>
            <MonstersBuffer onLoadImage={bufferMonsterImage}/>
        </>
    )

}

