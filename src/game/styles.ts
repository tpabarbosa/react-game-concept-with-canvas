import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components'

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
    .images-buffer {
        display: none;  
    }
`;


