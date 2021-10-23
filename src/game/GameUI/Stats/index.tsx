import * as S from './styles';
import {characters} from '../../constants/charactersTiles';
import { useRef, useEffect, useState } from 'react';


type Props = {
    phase: number;
    lives: number;
    mustClean: boolean;
    mustRender: boolean;
}

export const Stats = ({phase, lives, mustClean, mustRender}: Props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D| null>(null);
    const livesSize = useRef(20);

    useEffect(() => {
        if (canvasRef.current) {
            setCtx(canvasRef.current.getContext('2d'));
        }
    }, [setCtx, canvasRef]);

    useEffect(() => {
        if (mustClean && ctx) {
            ctx.clearRect(0,0, 3*livesSize.current + 6, 3*livesSize.current);
        }
    }, [ctx, mustClean]);

    useEffect(() => {
        const img: HTMLImageElement | null = document.querySelector(`#char-tile-img`);
        const tilesize = characters.list[1].tilesize ?? characters.common?.tilesize;
        if (img && ctx && tilesize && mustRender) {
            for(let i = 0; i <3; i++) {
                ctx.drawImage(
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
    }, [ctx, mustRender]);


    useEffect(() => {
        if(ctx || (ctx && mustRender)) {
            for(let i = 0; i < 3-lives; i++) {    
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'red';    
                ctx.beginPath();
                ctx.moveTo(i*livesSize.current+3*i, 0);
                ctx.lineTo((i+1)*livesSize.current+3*i, livesSize.current);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo((i+1)*livesSize.current+ 3*i, 0);
                ctx.lineTo(i*livesSize.current+3*i, livesSize.current);
                ctx.stroke();
            }
 
        }
    },[ctx, lives, mustRender])

    return (
        <S.Container>
            <S.Phase>
                <div>Fase</div>
                {phase}
            </S.Phase>
            <S.Lives>
                <div>Vidas</div>
                <canvas
                    ref={canvasRef}
                    width={`${3*livesSize.current + 6}px`}
                    height={`${livesSize.current}px`}
                />
            </S.Lives>
        </S.Container>
    )
}