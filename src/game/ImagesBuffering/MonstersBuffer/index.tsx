import { monstersTiles } from "../../GameData/Tiles/monstersTiles";

type Props = {
    onLoadImage: (image: string) => void;
}

export const MonstersBuffer = ({onLoadImage}: Props) => {

    return (
        <div className="images-buffer" >
        { monstersTiles.common && 
            <img
                key={`monsters-tile-img-common`} 
                id={`monsters-tile-img-common`} 
                src={`${monstersTiles.common?.file}`}
                alt={`monsters-tile-common`}
                onLoad={() => { onLoadImage('common'); }}
            />
        }   
        { Object.keys(monstersTiles.list).map(key => { 
            return (
                <img
                    key={`monsters-tile-img-${key}`} 
                    id={`monsters-tile-img-${key}`} 
                    src={`${monstersTiles.list[key].file}`}
                    alt={`monsters-tile-${key}`}
                    onLoad={() => { onLoadImage(`${monstersTiles.list[key]?.file}`); }}
                />);
            })
        }
        </div>
    )
}