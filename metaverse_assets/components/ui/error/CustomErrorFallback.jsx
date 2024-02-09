import React from 'react'

function CustomErrorFallback({ error }) {
    return (
        <div>
            <h2> Something went wrong! </h2>
            <p>{error.message}</p>
        </div>
    )
}

export default CustomErrorFallback
