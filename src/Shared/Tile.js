import styled from 'styled-components';
import {sutleBoxShadow,lightBlueBackground,redBoxShadow,greenBoxShadow, subtleBoxShadow} from './styles';

export const Tile = styled.div`
    ${subtleBoxShadow}
    ${lightBlueBackground}
    padding:10px;
`
export const SelectableTile = styled(Tile)`
    &:hover{
        cursor:pointer;
        ${greenBoxShadow}
    }
`

export const DeletableTile = styled(Tile)`
    &:hover{
        cursor:pointer;
        ${redBoxShadow}
    }
`

export const DisabledTile = styled(Tile)`
    pointer-events:none;
    opacity:0.4;
`