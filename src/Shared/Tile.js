import styled from 'styled-components';
import {sutleBoxShadow,lightBlueBackground,greenBoxShadow, subtleBoxShadow} from './styles';

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