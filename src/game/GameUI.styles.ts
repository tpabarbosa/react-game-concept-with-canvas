import styled from 'styled-components';
import {mapDimensions} from './MapArea/mapDimensions';

type Props = {
    color: string;
}

const {width, height, scale} = mapDimensions;

export const Container = styled.div `
    display:flex;
    //box-sizing: border-box;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin: 5px;
    width: ${width*scale}px;
    height: ${height*scale}px;
    text-align: center;
    border: 5px solid #768776;
    border-radius: 25px;
    padding: 20px;
    box-shadow: inset 0 0 4px #bfc1bf, 0 0 4px #45eb45;
    
`;

export const CounterDown = styled.div `
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
    // position: absolute;
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
