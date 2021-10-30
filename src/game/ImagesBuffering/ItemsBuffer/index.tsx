import {itemsTiles} from '../../GameData/Tiles/itemsTiles';

type Props = {
    onLoadImage: (image: string) => void;
}

export const ItemsBuffer = ({onLoadImage}: Props) => {

    return (
        <div className="images-buffer" >
            
            {itemsTiles.common &&
                <img
                    key={`items-tile-img-common`} 
                    id={`items-tile-img-common`} 
                    src={`${itemsTiles.common.file}`}
                    alt={`items-tile-common`}
                    onLoad={() => { onLoadImage(`${itemsTiles.common?.file}`) }}
                />

            }
            { Object.keys(itemsTiles.list).map(key => {
            return (
                <img
                    key={`items-tile-img-${key}`} 
                    id={`items-tile-img-${key}`} 
                    src={`${itemsTiles.list[key].file}`}
                    alt={`items-tile-${key}`}
                    onLoad={() => { onLoadImage(`${itemsTiles.list[key]?.file}`); }}
                />
            )})
        }   
        </div>
    )
}
