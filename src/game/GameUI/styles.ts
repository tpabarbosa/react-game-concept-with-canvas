import styled from 'styled-components';
import {mapDimensions} from '../constants/mapDimensions';

type Props = {
    color: string;
}

const {scaledWidth, scaledHeight} = mapDimensions;

export const Container = styled.div `
    background-color: #1c1c1e;
    display:flex;
    position: absolute;
    border: 5px solid #768776;
    border-radius: 25px;
    box-shadow: inset 0 0 4px #bfc1bf, 0 0 4px #45eb45;
`;

export const MapArea = styled.div`
    
    display:flex;
    justify-content: center;
    align-items: center;
    width: ${scaledWidth}px;
    height: ${scaledHeight}px;
    text-align: center;
    margin: 5px;
    padding: 20px;
`;


export const CounterDown = styled.div `
z-index: 2;
    width: 35%;
    padding: 20px 40px;
    opacity: 0.7;
    text-align: center;
    font-size: 120px;
    font-weight: bold;
    background-color: white;
    color: darkgreen;
    border-radius: 100%;
`;

export const Info = styled.h1(({color}: Props) => (
    `
    z-index: 3;
    top:0;//30px;
    width: 60%;//280px;
    left: 0;//60px;
    padding: 20px 40px;
    opacity: 0.6;
    text-align: center;
    background-color: ${color ?? 'lightblue'};
    border-radius: 50%;
`
));
