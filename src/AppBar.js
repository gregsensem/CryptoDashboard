import React from 'react'
import styled from 'styled-components';

const Bar = styled.div`
    display:grid
    grid-template-columns:200px auto 120px 120px;
`;

const AppBar = () => {
    return ( 
    <Bar>
        <div>CryptoDash</div>
        <div />
        <div>Dashboard</div>
        <div>Settings</div>
    </Bar> );
}
 
export default AppBar;
