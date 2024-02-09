import React, { useRef } from 'react'
import SidebarItem from './AdminSidebarItem'
import tw from 'tailwind-styled-components'
import { motion } from 'framer-motion'
import useElementPosition from 'common/window/useElementPosition'
// import { useAdminGlobalCtx } from 'common/global/useAdminGlobalCtx'
import { adminMenu } from 'libs/constants'
import { useWindowSize } from 'usehooks-ts'
export interface IMenu {
    column?: boolean
    items: IMenuItem[]
}
export interface IMenuItem {
    text: string
    href: string
}
const sidebarVariants = {
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
function AdminSidebar(): JSX.Element {
    const ref = useRef(null)
    useElementPosition(ref, { globalName: 'adminSidebar', isAdminSide: true })
    // const { adminGlobalItems } = useAdminGlobalCtx()
    // const [isShowScroll, setIsShowScroll] = useState<boolean>(false)
    // const adminMainHeight = adminGlobalItems.adminMain?.offsets?.offsetHeight
    // const sidebarNavHeight = refObjectData?.offsets?.offsetHeight
    const windowSize = useWindowSize()

    // useEffect(() => {
    //     if (sidebarNavHeight && adminMainHeight) {
    //         const isshowScroll: boolean = sidebarNavHeight > adminMainHeight
    //         setIsShowScroll(isshowScroll)
    //     }
    // }, [refObjectData])

    return (
        <SidebarTw
            ref={ref}
            variants={sidebarVariants}
            initial="hidden"
            animate={windowSize.width < 1024 ? 'exit' : 'visible'}
            exit="exit"
        >
            <SidebarNavTw className="floating-scrollbar">
                {Object.values(adminMenu).map((item, idx) => (
                    <SidebarItem key={'sidebar-' + idx} {...item} />
                ))}
            </SidebarNavTw>
        </SidebarTw>
    )
}
interface ISidebarTwProps extends React.HTMLProps<HTMLElement> {
    isshowscroll?: boolean | string
    adminmainheight?: number
}
const SidebarTw = tw(motion.aside)<ISidebarTwProps>`
 p-0
 my-10
 w-[200px]
 h-screen
 lg:p-10
 border-r
 bg-dark
 z-100
`

const SidebarNavTw = tw.nav`
  flex
  flex-col
  gap-1
  p-2
  pb-20
  max-h-[80vh]
  overflow-x-hidden
`

export default AdminSidebar
