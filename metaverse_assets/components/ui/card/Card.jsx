import React from 'react'
import Image from 'next/image'
import tw from 'tailwind-styled-components'
import Link from 'next/link'

function Card(props) {
    const { id, title, type, thumbnailUrl } = props

    return (
        <article>
            <CardTw>
                <figure>
                    {thumbnailUrl ? (
                        <Link href={`/asset/${id}`}>
                            <Image
                                src={thumbnailUrl}
                                className="rounded-[0.625rem] w-full lg:h-[230px] lg:w-[270px] object-cover"
                                alt="image alt"
                                width={600}
                                height={600}
                            />
                        </Link>
                    ) : (
                        <Link href={`/asset/${id}`}>
                            <div className=" bg-jacarta-100 w-[196.69px] h-[230px] rounded-[0.625rem]"></div>
                        </Link>
                    )}
                </figure>
                <div className="mt-4 flex items-center justify-between">
                    <Link href={`/asset/${id}`}>
                        <CardTitle>
                            <h1 className="cardTitle">{title}</h1>
                        </CardTitle>
                    </Link>
                    <CardSp>{type}</CardSp>
                </div>
            </CardTw>
        </article>
    )
}

const CardTw = tw.div`
    dark:bg-jacarta-700 
    dark:border-jacarta-700 
    border-jacarta-100 
    rounded-2xl 
    block 
    border 
    bg-white 
    p-[1.1875rem] 
    transition-shadow 
    hover:shadow-lg 
    text-jacarta-500
`
const CardTitle = tw.div`
    font-display 
    text-jacarta-700 
    hover:text-accent 
    text-base 
    dark:text-white
`
const CardSp = tw.div`
    flex   
    items-center 
    whitespace-nowrap 
`

export default Card
