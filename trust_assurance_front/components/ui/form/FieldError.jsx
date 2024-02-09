import React from 'react'

function FieldError({ text }) {
  return (
    <>
        { text ? <p className='text-danger'>{text}</p>: null }
    </>
  )
}

export default FieldError