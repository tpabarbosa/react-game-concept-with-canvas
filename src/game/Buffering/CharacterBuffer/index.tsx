import {char} from '../../MapArea/Entities/entities';

type Props = {
    onLoadImage: (image: string) => void;
}

export const CharacterBuffer = ({onLoadImage}: Props) => {
    
    return(
    <img
        id="char-tile-img" 
        alt="char-tile-img"
        onLoad={() => onLoadImage(`${char.tileData?.imageFile}`)}
        className="images-buffer"
        src={`${char.tileData?.imageFile}`}
    />
    );
}
