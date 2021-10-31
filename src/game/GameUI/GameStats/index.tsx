import * as S from './styles';
import {charactersTiles} from '../../GameData/Tiles/charactersTiles';
import {itemsTiles} from '../../GameData/Tiles/itemsTiles';
import { useRef, useEffect, useState } from 'react';
import { useCounterDown } from '../../helpers/Counter/useCounterDown';

type Props = {
    level: number;
    lives: number;
    mustClean: boolean;
    mustRender: boolean;
    totalCollected: number;
}

export const GameStats = ({level, lives, mustClean, mustRender, totalCollected}: Props) => {
    const livesCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const totalCollectedCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctxLives, setCtxLives] = useState<CanvasRenderingContext2D| null>(null);
    const [ctxTotalCollected, setCtxTotalCollected] = useState<CanvasRenderingContext2D| null>(null);
    const livesSize = useRef(20);
    const collectedSize = useRef(18);
    const lastTotalCollected = useRef(totalCollected);
    const [mustAnimateTotal, setMustAnimateTotal] = useState(false);

    const counter = useCounterDown({initial:1});

    useEffect(() => {
        if(!counter.isCounting) {
            setMustAnimateTotal(false);
        }
    }, [counter]);

    useEffect(() => {
        if (lastTotalCollected.current !== totalCollected || totalCollected===0) {
            counter.start();
            lastTotalCollected.current=totalCollected;
            setMustAnimateTotal(true);
        } 
    }, [totalCollected, counter, lastTotalCollected])

    useEffect(() => {
        if (livesCanvasRef.current) {
            setCtxLives(livesCanvasRef.current.getContext('2d'));
        }
        if (totalCollectedCanvasRef.current) {
            setCtxTotalCollected(totalCollectedCanvasRef.current.getContext('2d'));
        }
    }, [setCtxLives, setCtxTotalCollected, livesCanvasRef, totalCollectedCanvasRef]);

    useEffect(() => {
        if (mustClean && ctxLives) {
            ctxLives.clearRect(0,0, 3*livesSize.current + 6, 3*livesSize.current);
        }
        if (!mustAnimateTotal && ctxTotalCollected) {
            ctxTotalCollected.clearRect(0,0, 0.5*collectedSize.current, collectedSize.current);
        }

    }, [ctxLives, mustClean, ctxTotalCollected, mustAnimateTotal]);

    useEffect(() => {
        const img: HTMLImageElement | null = document.querySelector(`#char-tile-img`);
        const tilesize = charactersTiles.list[1].tilesize ?? charactersTiles.common?.tilesize;
        if (img && ctxLives && tilesize && mustRender) {
            for(let i = 0; i <3; i++) {
                ctxLives.drawImage(
                    img,
                    0,
                    0,
                    tilesize,
                    tilesize,
                    i*livesSize.current+i*3,
                    0,
                    livesSize.current,
                    livesSize.current,
                );
            }
        }
    }, [ctxLives, mustRender]);


    useEffect(() => {
        const img: HTMLImageElement | null = document.querySelector(`#items-tile-img-1`);
        const tilesize = itemsTiles.list[1].tilesize ?? itemsTiles.common?.tilesize;
        if (img && ctxTotalCollected && tilesize && mustAnimateTotal) {
                
                ctxTotalCollected.lineWidth = 2;
                ctxTotalCollected.strokeStyle = 'gold';    
                ctxTotalCollected.beginPath();
                ctxTotalCollected.moveTo(0.25*collectedSize.current, 0*collectedSize.current);
                ctxTotalCollected.lineTo(0.25*collectedSize.current, 0.5*collectedSize.current);
                ctxTotalCollected.stroke();
                ctxTotalCollected.beginPath();
                ctxTotalCollected.moveTo(0.0*collectedSize.current, 0.25*collectedSize.current);
                ctxTotalCollected.lineTo(0.5*collectedSize.current, 0.25*collectedSize.current);
                ctxTotalCollected.stroke();

                ctxTotalCollected.drawImage(
                    img,
                    4*tilesize,
                    0,
                    tilesize,
                    tilesize,
                    0.5*collectedSize.current,
                    0,
                    collectedSize.current,
                    collectedSize.current,
                );
        }
    }, [ctxTotalCollected, mustAnimateTotal]);

    useEffect(() => {
        if(ctxLives || (ctxLives && mustRender)) {
            for(let i = 0; i < 3-lives; i++) {  
                ctxLives.lineWidth = 3;
                ctxLives.strokeStyle = 'red';    
                ctxLives.beginPath();
                ctxLives.moveTo(i*livesSize.current+3*(i), 0);
                ctxLives.lineTo((i+1)*livesSize.current+3*(i), livesSize.current);
                ctxLives.stroke();
                ctxLives.beginPath();
                ctxLives.moveTo((i+1)*livesSize.current+3*(i), 0);
                ctxLives.lineTo(i*livesSize.current+3*(i), livesSize.current);
                ctxLives.stroke();
            }
        }
    },[ctxLives, lives, mustRender])

    return (
        <S.Container>
            <S.Level>
                <div>Nível: {level}</div>
            </S.Level>
            <S.Lives>
            <div>
                <canvas
                    ref={livesCanvasRef}
                    width={`${3*livesSize.current + 6}px`}
                    height={`${livesSize.current}px`}
                />
            </div>
            </S.Lives>
            <S.Collected>
                <div>
                    <canvas
                        ref={totalCollectedCanvasRef}
                        width={`${1.5*collectedSize.current}px`}
                        height={`${collectedSize.current}px`}
                    />
                </div>
                <div>{totalCollected}</div>
            </S.Collected>
        </S.Container>
        
    )
}