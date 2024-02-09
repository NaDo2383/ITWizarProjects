import React, { forwardRef } from 'react'
import { GrNext } from "react-icons/gr";

function ChevronButton(props) {
    const { position } = props;
    let direction;
    switch (position) {
        case "down": direction = 'rotate-90'; break;
        case "left": direction = 'rotate-180'; break;
        case "top": direction = '-rotate-90'; break;
        case "right": direction = ''; break;
        default: null;
    }
    return <GrNext className={direction} />
}

const BgChevronButton = forwardRef((props, ref) => {
    const { position, transparent } = props;
    
    return <button ref={ref} className={`${transparent ? " bg-none" : "bg-gray-100"} p-6 rounded-full`}>
        <ChevronButton position={position} />
    </button>
})
export { BgChevronButton }
export default React.memo(ChevronButton)