export const sidebarVariants = {
    hidden: {
        opacity: 0,
        x: '-100vw',
    },
    visible: {
        opacity: 1,
        x: 0,
    },
    exit: {
        width: 0,
        x: '-200vw',
        transition: { ease: 'easeInOut' },
    },
}
