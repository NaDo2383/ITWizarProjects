import React from 'react'
interface IFieldError {
    text: string
}
function FieldError({ text }: IFieldError) {
    return <>{text ? <p className=" text-red">{text}</p> : null}</>
}

export default FieldError
