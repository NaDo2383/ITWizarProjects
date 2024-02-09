import Image from 'next/image'
import { useState } from 'react'
import { IImage } from './_interface'

function BlurImg({ width, height, src, alt }: IImage) {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    return (
        <>
            <Image
                src={src}
                alt={alt ?? 'this is image'}
                width={width}
                height={height}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 33vw"
                onLoadingComplete={() => setIsLoading(false)}
                className={`${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
                loading="lazy"
                objectFit="cover"
            />
        </>
    )
}

export default BlurImg
