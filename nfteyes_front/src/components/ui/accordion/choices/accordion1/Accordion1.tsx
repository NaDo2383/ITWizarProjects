import React from 'react'
import tw from 'tailwind-styled-components'
import Panel from './Panel'
import { FaAnchor, FaSailboat } from 'react-icons/fa6'
import { GiFishingLure, GiLighthouse } from 'react-icons/gi'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import Accordion from '../../Accordion'
const items = [
    {
        id: 0,
        title: 'Anchor',
        content: 'Lorem ipsum dolor sit amet, consectetur',
        image: '/images/accordion/anchor.webp',
        icon: () => <FaSailboat />,
    },
    {
        id: 1,
        title: 'Boating',
        content:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis animi quia praesentium, similique ab asperiores fugit, totam molestiae deleniti est accusantium ipsum nulla facilis beatae voluptatem tempora! Aliquam, architecto impedit!',
        image: '/images/accordion/boat.webp',
        icon: () => <FaAnchor />,
    },
    {
        id: 2,
        title: 'Fishing',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, voluptatem impedit natus recusandae libero cum similique. Odit, sed ducimus id, officiis soluta autem delectus quasi minima aperiam consequuntur quae quam!',
        image: '/images/accordion/fishing.webp',
        icon: () => <GiFishingLure />,
    },
    {
        id: 3,
        title: 'Light House',
        content:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam distinctio cum dolores repellendus, fugiat perferendis dolore atque suscipit facere quidem a. Eaque, cupiditate illo autem laborum consequatur recusandae porro saepe.',
        image: '/images/accordion/lighthouse.webp',
        icon: () => <GiLighthouse />,
    },
    {
        id: 4,
        title: 'Reef',
        content:
            'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae et obcaecati placeat id nemo impedit iusto minus voluptas, aliquam vel. Quisquam molestias distinctio sed accusantium officiis inventore minus natus ex!',
        image: '/images/accordion/reef.webp',
        icon: () => <AiOutlineThunderbolt />,
    },
]
function Accordion1() {
    return (
        <Accordion>
            <AccordionWrapper>
                <AccordionInner className="accordion">
                    {items.map((item, idx) => (
                        <Panel key={'acc-item-' + idx} {...item} />
                    ))}
                </AccordionInner>
            </AccordionWrapper>
        </Accordion>
    )
}

const AccordionWrapper = tw.div`
    max-w-[50rem]
    mx-auto
    px-[1rem]
`
const AccordionInner = tw.div`
    flex
    flex-col
    gap-[1rem]
`

export default Accordion1
