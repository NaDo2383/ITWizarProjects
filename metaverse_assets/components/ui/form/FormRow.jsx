import tw from 'tailwind-styled-components'

function FormRow({ children, className, errMsg }) {
    return (
        <FormRowStyled className={`${className || ''}`}>
            {children}
            {errMsg && <ErrMsgStyled>{errMsg}</ErrMsgStyled>}
        </FormRowStyled>
    )
}

const FormRowStyled = tw.div`
   relative
   flex
   flex-col
   w-full
   pb-[20px]
   text-left
   last:pb-0
`

// ErrMsgTw
const ErrMsgStyled = tw.p`
   text-red
`

export default FormRow
