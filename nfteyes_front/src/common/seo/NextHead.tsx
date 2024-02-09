import React from 'react'
import Head from 'next/head'
import { IHead } from './_interface'
/**
 * @createdBy Phill Anderson 2022/11/15
 */
function NextHead(props: IHead): JSX.Element {
    const { title, meta } = props
    return (
        <Head>
            <title>{title}</title>
            <meta name={meta?.name} content={meta?.content} />
            <link rel="icon" href="./ico.png" />
        </Head>
    )
}

export default NextHead
