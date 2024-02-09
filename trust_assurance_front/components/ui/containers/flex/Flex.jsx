/**
 * @createdBy Phill Anderson 2023/09/15
 */
import styled from "styled-components";

export const Flex = styled.div`
    display: flex;
    flex-direction: ${ props => props.column ? 'column' : 'row' };
    gap: ${  props => props.gap ? `${props.gap}px`: 0 };
    align-items: ${ props => props.align ? props.align : 'start'};
    justify-content: ${ props => props.justify ? props.justify : 'start' };
    width: ${ props => props.width ? props.width : 'auto'};
    padding-block: ${ props => props.py ? props.py + 'px' : 0 };
    padding-inline: ${ props => props.px ? props.px + 'px' : 0 };
    position: ${ props => props.position ||  'relative' };
`
