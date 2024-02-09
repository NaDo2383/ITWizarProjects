import React from 'react'

function Json({ jsonData }: any): JSX.Element {
    return <pre>{JSON.stringify(jsonData, undefined, 2)}</pre>
}

export default Json
