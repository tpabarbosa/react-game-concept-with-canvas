import { useEffect, useState } from "react";
import { MapBuffer } from './MapBuffer';
import { ItemsBuffer } from './ItemsBuffer';
import { MonstersBuffer } from './MonstersBuffer';
import { CharacterBuffer } from './CharacterBuffer';

import { itemsTotalTiles} from '../GameData/Tiles/itemsTiles';
import { mapTotalTiles } from "../GameData/Tiles/mapTiles";
import { monstersTotalTiles } from "../GameData/Tiles/monstersTiles";
import { charactersTotalTiles } from "../GameData/Tiles/charactersTiles";
import { AppActions } from "../AppState";


type Props = {
    appTransition: (action: AppActions | void) => void;
}

type BufferingStates = 'NOT_STARTED' | 'MAP_BUFFERED' | 'ITEMS_BUFFERED' | 'MONSTERS_BUFFERED' | 'CHAR_BUFFERED' | 'FINISHED'

export const ImagesBuffering = ({appTransition}: Props) => {
    const [bufferingState, setBufferingState] = useState<BufferingStates>('NOT_STARTED')
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
        if(mapBuffered.length === mapTotalTiles && bufferingState === 'NOT_STARTED') {
           setBufferingState('MAP_BUFFERED');
        }
        if(itemsBuffered.length === itemsTotalTiles && bufferingState === 'MAP_BUFFERED') {
            setBufferingState('ITEMS_BUFFERED');
        }
        if(characterBuffered.length === charactersTotalTiles && bufferingState === 'ITEMS_BUFFERED') {
            setBufferingState('CHAR_BUFFERED');
        }

        if(monstersBuffered.length === monstersTotalTiles && bufferingState === 'CHAR_BUFFERED') {
            setBufferingState('MONSTERS_BUFFERED');
        }
        if(bufferingState === 'MONSTERS_BUFFERED') {
            setBufferingState('FINISHED');
            appTransition('FINISHED_BUFFERING');
            
        }
    },[mapBuffered, itemsBuffered, characterBuffered, monstersBuffered, bufferingState, appTransition])

    return(
        <>
            <MapBuffer onLoadImage={bufferMapImage}/>
            <ItemsBuffer onLoadImage={bufferItemImage}/>
            <CharacterBuffer onLoadImage={bufferCharacterImage}/>
            <MonstersBuffer onLoadImage={bufferMonsterImage}/>
        </>
    )

}

