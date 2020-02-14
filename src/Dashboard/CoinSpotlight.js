import React from 'react';
import styled from 'styled-components';
import {Tile} from '../Shared/Tile';
import { AppContext } from '../AppProvider';
import CoinImage from '../Shared/CoinImage';

const SportlightName = styled.h2`
    text-align: center;
`
export default function(){
    return(
        <AppContext.Consumer>
            {({currentFavorite,coinList})=>
                <Tile>
                    <SportlightName>{coinList[currentFavorite].CoinName}</SportlightName>
                    <CoinImage spotlight coin={coinList[currentFavorite]} />  
                </Tile>
            }
        </AppContext.Consumer>
    ) 
}
