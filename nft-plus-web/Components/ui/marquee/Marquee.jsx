import MarqueeFast from 'react-fast-marquee'

function Marquee(props) {
    const { children, direction } = props

    return (
        <MarqueeFast
            direction={direction}
            pauseOnHover
            speed={50}
            delay={1}
            loop={0}
            gradient={false}
        >
            { children }
        </MarqueeFast>
    )
}
export default Marquee