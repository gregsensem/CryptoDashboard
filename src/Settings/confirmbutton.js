import React from 'react';
import styled from 'styled-components';
import {AppContext} from '../AppProvider';
import {fontSize1, greenBoxShadow, color3} from "../Shared/styles";

const ConfirmButtonStyled = styled.div`
    margin:20px;
    color:${color3}; 
    ${fontSize1}
    cursor:pointer;
    padding 5px;
    &:hover{
        ${greenBoxShadow}
    }
`
export const CenterDiv = styled.div`
    display:grid;
    justify-content:center;
`
export default function(){
    return (
        <AppContext.Consumer>
            {({confirmFavorites})=>
                <CenterDiv>
                    <ConfirmButtonStyled onClick={confirmFavorites}>
                        ConfirmFavorites
                    </ConfirmButtonStyled>
                </CenterDiv>
            }
        </AppContext.Consumer>
    )}

