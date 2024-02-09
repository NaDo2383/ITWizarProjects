import React from 'react'

export default function AudioViewer({ file, width, height, style }) {
    const convertedFile = URL.createObjectURL(file)

    return (
        <div style={style}>
            <audio width={width} height={height} controls>
                <source src={convertedFile} />
            </audio>
        </div>
    )
}
