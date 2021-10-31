import styled from 'styled-components';

export const Container = styled.div`
    text-align:center;
    position:absolute;
    top:410px;
    width: 360px;
    z-index: 100;
    margin: 0 auto; 
    display: flex;
    align-items:center;
    
    button { 
        cursor:pointer;
        font-size:20px;
        width: 60px;
        height: 50px;
        border-radius:30%;
        margin: 0px 2px 2px;
        border: 0;
        background-color: #cbcbd0;
        box-shadow:3px 3px 4px #24242a;
        -webkit-tap-highlight-color: transparent;
        :active {
            background-color:#767676;
        }
    } 

    #stateButton {
        margin-top: 10px;
        width: 140px;
        height: 50px;
        border-radius: 10px;
    }
`;

export const Background = styled.div`
position: absolute;
    top:430px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0c353e;
    box-shadow:3px -3px 4px #24242a;
`;

export const DirectionsButtons = styled.div`
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 160px;
    div { 
        margin: 0;
        padding:0
    }
`;

export const StateButtons = styled.div`
    margin: 0 auto; 
`;