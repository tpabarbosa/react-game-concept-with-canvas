import {monsters} from '../../MapArea/Entities/entities';

type Props = {
    onLoadImage: (image: string) => void;
}

export const MonstersBuffer = ({onLoadImage}: Props) => {

    return (
        <div className="images-buffer" >
        { monsters.commonData && 
            <img
                key={`monsters-tile-img-common`} 
                id={`monsters-tile-img-common`} 
                src={`${monsters.commonData?.imageFile}`}
                alt={`monsters-tile-common`}
                onLoad={() => { onLoadImage('common'); }}
            />
        }   
        { monsters.monstersList.map((key, index) => {
            if (key.tileData) {
                const filename = key.tileData.imageFile;
                return (
                    <img
                        key={`monsters-tile-img-${index}`} 
                        id={`monsters-tile-img-${index}`} 
                        src={`${filename}`}
                        alt={`monsters-tile-${index}`}
                        onLoad={() => { onLoadImage(`${index}`); }}
                    />);
                }
            return false;
            })
        }
        </div>
    )
}