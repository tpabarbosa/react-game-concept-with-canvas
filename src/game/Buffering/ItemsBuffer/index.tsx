import {itemsTileImages} from '../../MapArea/Entities/itemsTileImages';

type Props = {
    onLoadImage: (image: string) => void;
}

export const ItemsBuffer = ({onLoadImage}: Props) => {

    return (
        <div className="images-buffer" >
            
        { Object.keys(itemsTileImages).map(key => { 
            return (
                <img
                    key={`items-tile-img-${key}`} 
                    id={`items-tile-img-${key}`} 
                    src={`${itemsTileImages[key].imageFile}`}
                    alt={`items-tile-${key}`}
                    onLoad={() => { onLoadImage(itemsTileImages[key].imageFile); }}
                />
            )})
        }   
        </div>
    )
}
