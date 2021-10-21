import {mapTileImages} from '../../MapArea/mapTileImages';

type Props = {
    onLoadImage: (image: string) => void;
}

export const MapBuffer = ({onLoadImage}: Props) => {

    return (
        <div className="images-buffer" >
        {
            Object.keys(mapTileImages).map(key => {
                return (
                    <img
                        key={`map-tile-img-${key}`} 
                        id={`map-tile-img-${key}`} 
                        src={`${mapTileImages[key]}`}
                        alt={`map-tile-${key}`}
                        onLoad={() => { onLoadImage(mapTileImages[key]); }}
                    />
                );
            })
        }
        </div>
    )
}