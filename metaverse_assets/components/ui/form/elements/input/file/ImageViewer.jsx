import React from 'react'
import useFile from './useFile'
import Image from 'next/image'

function ImageViewer({ file, width, height, style }) {
    const { convertedFile } = useFile(file)
    return (
        <div style={style}>
            <Image
                alt={file?.name}
                src={convertedFile || '/images/demo-image.png'}
                width={width ? `${width}` : 1280}
                height={height ? `${height}` : 1280}
            />
        </div>
    )
}

export default ImageViewer
