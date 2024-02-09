import styled from 'styled-components'

export const OrderedList = styled.ol`
    padding: 20px;
    & li {
        list-style-type: upper-roman;
        padding-block: 5px;
        & ol {
            padding-left: 20px;
        }
    }
`
