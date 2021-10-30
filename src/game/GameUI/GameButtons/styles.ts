import styled from 'styled-components';

export const Container = styled.div`
    text-align:center;
    position:absolute;
    top:410px;
    left:0px;
    display:flex;
    align-items:center;
    justify-content:center;
    width: 400px;
    padding:0  0px;
    z-index: 100;
    
    button { 
        cursor:pointer;
        font-size:20px;
        width: 50px;
        height: 50px;
        border-radius:30%;
        margin: 0 2px;
        border: 0;
        background-color: #cbcbd0;
        /* :hover {
            background-color:#767676;
        } */
    } 


    #stateButton {
        margin-top: 10px;
        width: 120px;
        height: 50px;
        border-radius: 10px;
    }
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
    margin: 0 30px; 
`;