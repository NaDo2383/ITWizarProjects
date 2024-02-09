import React from 'react'
import useFile from './useFile'
import Image from 'next/image'

type TImageViewer = Partial<TShape> & {
    file: File
    onDrop?: (droppedFile: any) => void
}

function ImageViewer({ file, width, height, onDrop }: TImageViewer) {
    const { convertedFile } = useFile(file)
    console.log('hello im convertedFile', convertedFile)
    console.log('hello im file', file)

    // const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    //     e.preventDefault()
    //     const dropContainer = e.currentTarget
    //     dropContainer.classList.remove('drag-active')

    //     const file = e.dataTransfer.files?.[0]
    //     if (file) {
    //         setSelectedImage(file)
    //     }
    // },[])
    return (
        <div onDrop={onDrop}>
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
