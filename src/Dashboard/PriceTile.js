import React from 'react';
import styled, {css} from 'styled-components';
import {SelectableTile} from '../Shared/Tile';
import { fontSize3,fontSizeBig } from '../Shared/styles';
import {CoinHeaderGridStyled} from '../Settings/CoinHeaderGrid';

const numberFormat = number =>{
    return +(number + '').slice(0,7);
}

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css `
        display:grid;
        grid-gap:0.25rem;
        grid-template-columns: repeat(3,1fr);
        ${fontSize3}
    `}  
`
const JustifyRight = styled.div`
    justify-self:right;
`
const JustifyLeft = styled.div`
    justify-self:left;
`
const ChangePct = styled.div` 
        color: green;
    ${props => props.zero && css`
        color:grey;
    `}
    ${props => props.red && css`
        color:red;
    `}
`
const TickerPrice = styled.div`
    ${fontSizeBig}
`
function PriceTile({sym, data}){
    return(   
        <PriceTileStyled>
            <CoinHeaderGridStyled>
                <div>{sym}</div>
                <JustifyRight>
                    <ChangePct zero={data.CHANGEPCT24HOUR ==0} red={data.CHANGEPCT24HOUR <0}>
                        {numberFormat(data.CHANGEPCT24HOUR)}
                    </ChangePct>
                </JustifyRight>
            </CoinHeaderGridStyled>
            <TickerPrice>
                ${numberFormat(data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    )
}

function PriceTileCompact({sym, data}){
    return(   
        <PriceTileStyled compact>
            <div>{sym}</div>
            <ChangePct zero={data.CHANGEPCT24HOUR ==0} red={data.CHANGEPCT24HOUR <0}>
                {numberFormat(data.CHANGEPCT24HOUR)}
            </ChangePct>
            <JustifyRight>
                ${numberFormat(data.PRICE)}
            </JustifyRight>
        </PriceTileStyled>
    )
}

export default function({price, index}){  
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    let TileClass = index < 5 ? PriceTile : PriceTileCompact;
    return <TileClass compact={index>=5} sym={sym} data={data} />
}