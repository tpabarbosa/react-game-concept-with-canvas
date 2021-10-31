import styled from 'styled-components';
import {mapDimensions} from '../GameData/mapDimensionsData';

type Props = {
    color: string;
}

const {scaledWidth, scaledHeight} = mapDimensions;

export const Container = styled.div `
    display:flex;
    position: absolute;
    border: 5px solid #768776;
    border-radius: 25px;
    z-index:2;   
    height: ${scaledHeight+105}px;
    box-shadow: inset 0 0 4px #bfc1bf, 0 0 4px #45eb45;
    overflow: hidden;
`;

export const MapArea = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width: ${scaledWidth}px;
    height: ${scaledHeight}px;
    text-align: center;
    margin: 0px;
    padding: 0px;
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
    top:0;
    width: 60%;
    left: 0;
    padding: 20px 40px;
    opacity: 0.6;
    text-align: center;
    background-color: ${color ?? 'lightblue'};
    border-radius: 50%;
`
));
