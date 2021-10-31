import styled from 'styled-components';

export const Container = styled.div `
    position: absolute;
    display: grid;
    align-content: center;
    grid-template-columns: 25% 30% 33%;
    box-sizing: border-box;
    width:360px;
    padding: 3px;
    font-size: 12px;
    background-color: #0c353e;
    box-shadow:3px 3px 4px #24242a;

    div{
        displaY: flex;
        align-items: center;
        margin:0 4px;
        border-radius: 8px;
        padding: 2px 4px;
        font-weight: bold;
        background-color: #eaeaea;
        color: #0c353e;
    }
    canvas {
        padding: 2px 4px;
    }
`;

export const Level = styled.div `

`;

export const Lives = styled.div `

`;

export const Collected = styled.div `
    
    div{
        margin: 0 0;
        padding: 2px 0 2px 4px;
        canvas {
            padding: 2px 0 2px 4px;
        }
    }
`;