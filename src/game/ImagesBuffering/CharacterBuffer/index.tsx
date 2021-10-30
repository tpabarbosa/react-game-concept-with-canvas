import { charactersTiles } from '../../GameData/Tiles/charactersTiles';

type Props = {
    onLoadImage: (image: string) => void;
}

export const CharacterBuffer = ({onLoadImage}: Props) => {
    
    return(
    <img
        id="char-tile-img" 
        alt="char-tile-img"
        onLoad={() => onLoadImage(`${charactersTiles.list[1].file}`)}
        className="images-buffer"
        src={`${charactersTiles.list[1].file}`}
    />
    );
}
