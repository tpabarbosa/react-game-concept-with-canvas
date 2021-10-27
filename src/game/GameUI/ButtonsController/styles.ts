import styled from 'styled-components';

export const Container = styled.div`
    text-align:center;
    position:absolute;
    top:430px;
    left:0px;
    display:flex;
    align-items:end;
    justify-content:center;
    width: 360px;
    padding:0  20px;
    
    button { 
        cursor:pointer;
        font-size:20px;
        width: 40px;
        height: 40px;
    
        :hover {
            background-color:#767676;
        }
    } 


    #stateButton {
        margin-top: 10px;
        width: 120px;
        height: 40px;
    }
`;

export const DirectionsButtons = styled.div`
    margin: 0 20px;
`;

export const StateButtons = styled.div`
    margin: 0 20px; 
`;