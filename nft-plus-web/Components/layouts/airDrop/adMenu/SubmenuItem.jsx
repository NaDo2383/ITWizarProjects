import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function SubmenuItem(props) {
    const { text, href , onClick, parentItem, setActiveMenuIdx } = props
    const theText = text || ' ';
    const theHref = href || '/'; 
    const router = useRouter();
    const isActive = router.pathname === theHref;
    const [isHovered, setIsHovered] = useState(false);
    
    function handleOnClick() {
        onClick(false)
        setActiveMenuIdx(parentItem.columnId - 1)
    }
    return (
        <li
            onClick={handleOnClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={theHref} passHref>
                <a
                    style={{
                        color: isActive || isHovered ? 'white' : '#ababab',
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 400,
                        letterSpacing: '-0.015em',
                        lineHeight: '26px',
                    }}
                >
                    {theText}
                </a>
            </Link>
        </li>
  )
}

export default SubmenuItem