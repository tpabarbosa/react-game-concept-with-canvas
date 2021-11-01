import styled from 'styled-components';

type Props = {
    color: string;
}

export const Container = styled.div `
    display:flex;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index:2;   

`;

export const MapArea = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    height: 85%;
    width: 100%;
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
