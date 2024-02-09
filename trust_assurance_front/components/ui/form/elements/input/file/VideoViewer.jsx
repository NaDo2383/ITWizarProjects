import React from 'react'

export default function VideoViewer({ file, width, height, style }) {
    const convertedFile = URL.createObjectURL(file)

    return (
        <div style={style}>
            <video width={width} height={height} controls>
                <source src={convertedFile} />
            </video>
        </div>
    )
}
