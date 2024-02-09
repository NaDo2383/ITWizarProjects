import styled from 'styled-components'

function FormRow({ children, className, errMsg }) {
    return (
        <FormRowStyled className={`${className || ''}`}>
            {children}
            {errMsg && <ErrMsgStyled>{errMsg}</ErrMsgStyled>}
        </FormRowStyled>
    )
}

const FormRowStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

// ErrMsgTw
const ErrMsgStyled = styled.p`
  color: orange;
`;

export default FormRow
