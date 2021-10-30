import { mapTiles } from "../../GameData/Tiles/mapTiles";


type Props = {
    onLoadImage: (image: string) => void;
}

export const MapBuffer = ({onLoadImage}: Props) => {

    return (
        <div className="images-buffer" >
        {
            Object.keys(mapTiles.list).map(key => {
                return (
                    <img
                        key={`map-tile-img-${key}`} 
                        id={`map-tile-img-${key}`} 
                        src={`${mapTiles.list[key].file}`}
                        alt={`map-tile-${key}`}
                        onLoad={() => { onLoadImage(`mapTiles.list[key]?.file`); }}
                    />
                );
            })
        }
        </div>
    )
}