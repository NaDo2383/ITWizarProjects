/**
 * @createdBy Phill Anderson 2022/11/15
 */
import React from 'react'
import Head from 'next/head'

function NextHead(props) {
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
