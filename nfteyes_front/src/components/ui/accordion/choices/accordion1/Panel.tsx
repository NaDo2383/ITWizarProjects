import Image from 'next/image'
import React from 'react'
import { useAccordionCtx } from '../../store/useAccordionCtx'
type TAccordionPanel = {
    id: number
    title: string
    content: string
    image: string
    icon: () => JSX.Element
}

function Panel(props: TAccordionPanel) {
    const { id, title, content, image, icon } = props
    const { activeAccordionId, setActiveAccordionId } = useAccordionCtx()

    const isActive = activeAccordionId === id

    function handleClick() {
        if (isActive) {
            setActiveAccordionId(null)
        } else {
            setActiveAccordionId(id)
        }
    }

    return (
        <div className="accordion-panel">
            <h2 onClick={handleClick}>
                <button
                    className="accordion-title"
                    aria-controls={`panel${id}-content`}
                    aria-expanded={isActive ? 'true' : 'false'}
                >
                    <div className="accordion-icon">{icon()}</div>
                    <span id={`panel${id}-title`}>{title}</span>
                </button>
            </h2>
            <div
                id={`panel${id}-content`}
                className="accordion-content"
                aria-labelledby={`panel${id}-heading`}
                role="region"
            >
                <p>{content}</p>
                <Image
                    src={image}
                    className="accordion-image"
                    alt="a sialboat at sea during sunset"
                    width={600}
                    height={350}
                />
            </div>
        </div>
    )
}

export default Panel
