import { characters } from '../../../constants/charactersTiles';

type Props = {
    onLoadImage: (image: string) => void;
}

export const CharacterBuffer = ({onLoadImage}: Props) => {
    
    return(
    <img
        id="char-tile-img" 
        alt="char-tile-img"
        onLoad={() => onLoadImage(`${characters.list[1].file}`)}
        className="images-buffer"
        src={`${characters.list[1].file}`}
    />
    );
}
