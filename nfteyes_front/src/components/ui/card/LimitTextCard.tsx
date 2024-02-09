import React from 'react'

export function LimitTextCard() {
    return (
        <article className="card">
            <h2>Article title</h2>
            <p className="cutoff-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora dolorum molestias perspiciatis
                mollitia sit temporibus nostrum eum neque ex quibusdam facere voluptates ut dolores, voluptas rem iste
                in ad voluptatem.
            </p>
        </article>
    )
}

export function LimitTextCard1() {
    return (
        <article className="card">
            <h2>Article title</h2>
            <p className="cutoff-text-1">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora dolorum molestias perspiciatis
                mollitia sit temporibus nostrum eum neque ex quibusdam facere voluptates ut dolores, voluptas rem iste
                in ad voluptatem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum soluta nesciunt cum
                aliquid unde omnis doloribus earum optio repellat accusamus quo maiores sapiente delectus accusantium
                modi natus perferendis, aliquam quos.
            </p>
            <input type="checkbox" className="expand-btn" />
        </article>
    )
}
