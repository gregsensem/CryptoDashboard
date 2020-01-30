import React from 'react'
import styled, {css} from 'styled-components';
import {AppContext} from "./AppProvider";

const Bar = styled.div`
    display:grid
    grid-template-columns:200px auto 120px 120px;
    margin-bottom:40px;
`;

const Logo =styled.div`
    font-size:1.5rem;
`;

const ControlButtonElem = styled.div`
    cursor:pointer;
    ${props=>props.active && css`
        text-shadow:0px 0px 60px #03ff03 
    `}
`;

function toProperCase(string){
    return string.charAt(0).toUpperCase() + string.substr(1);
}

function ControlButton({name}){
    return(
    <AppContext.Consumer>
        {({page,setPage})=> (
            <ControlButtonElem active={page===name} onClick={()=>setPage(name)}>
                {toProperCase(name)}
            </ControlButtonElem>
        )}
    </AppContext.Consumer>
    )
}


const AppBar = () => {
    return ( 
    <Bar>
        <Logo>CryptoDash</Logo>
        <div />
        <ControlButton name='dashboard' />
        <ControlButton name='settings' />
    </Bar> );
}
 
export default AppBar;
