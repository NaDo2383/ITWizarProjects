import tw from 'tailwind-styled-components'
interface IFormRow {
    children: React.ReactNode
    className?: string
    errMsg?: string | null
}
function FormRow({ children, className, errMsg }: IFormRow): JSX.Element {
    return (
        <FormRowTw className={`${className || ''}`}>
            {children}
            {errMsg && <ErrMsgTw>{errMsg}</ErrMsgTw>}
        </FormRowTw>
    )
}

const FormRowTw = tw.div`
    relative
    flex
    flex-col
    pb-[15px]
`

const ErrMsgTw = tw.p`
    text-darkPurple
    text-[20px]
`

export default FormRow
