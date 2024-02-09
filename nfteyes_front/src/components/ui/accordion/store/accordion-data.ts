export type TAccItem = {
    id: number
    value: string
    title: string
    content: string
}
export const accordionItems: TAccItem[] = [
    {
        id: 1,
        value: 'value-1',
        title: 'Is it accessible?',
        content: 'Yes. It adheres to the WAI-ARIA design pattern.',
    },
    {
        id: 2,
        value: 'value-2',
        title: 'Is it unstyled?',
        content:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit quibusdam corrupti animi accusantium! Facilis, eius mollitia eum, rem architecto quaerat porro harum molestiae soluta sed repudiandae necessitatibus aut ipsum neque!',
    },
    {
        id: 3,
        value: 'value-3',
        title: 'Can it be animated?',
        content: 'Yes. It`s unstyled by default, giving you freedom over the look and feel.  ',
    },
]
