import React from 'react'

function FieldError({ text }) {
    return <>{text ? <p className=" text-red">{text}</p> : null}</>
}

export default FieldError
