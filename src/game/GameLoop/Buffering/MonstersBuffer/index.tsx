import { monsters } from "../../../constants/monstersTiles";

type Props = {
    onLoadImage: (image: string) => void;
}

export const MonstersBuffer = ({onLoadImage}: Props) => {

    return (
        <div className="images-buffer" >
        { monsters.common && 
            <img
                key={`monsters-tile-img-common`} 
                id={`monsters-tile-img-common`} 
                src={`${monsters.common?.file}`}
                alt={`monsters-tile-common`}
                onLoad={() => { onLoadImage('common'); }}
            />
        }   
        { Object.keys(monsters.list).map(key => { 
            return (
                <img
                    key={`monsters-tile-img-${key}`} 
                    id={`monsters-tile-img-${key}`} 
                    src={`${monsters.list[key].file}`}
                    alt={`monsters-tile-${key}`}
                    onLoad={() => { onLoadImage(`${monsters.list[key]?.file}`); }}
                />);
            })
        }
        </div>
    )
}