import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'
import { mapDimensions } from './GameData/mapDimensionsData';

const {scaledWidth, scaledHeight} = mapDimensions;

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #24242a;
        overflow: hidden;
        margin: 0;
        top:0;
        left:0;
        padding:0;
        box-sizing: border-box;
    }
`;

export const Container = styled.div`
    position:absolute;
    width: ${scaledWidth}px;
    height: ${scaledHeight+105}px;
    box-shadow: inset 0 0 4px #bfc1bf, 0 0 4px #45eb45;
    border: 5px solid #768776;
    border-radius: 25px;
    overflow: hidden;

    .images-buffer {
        display: none;  
    }
`;


