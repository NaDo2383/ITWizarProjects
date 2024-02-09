import Form from 'a/components/ui/form/Form'
import React from 'react'
import tw from 'tailwind-styled-components'
import SideFilter from './SideFilter'

function SideBar() {
    return (
        <SideBarTw>
            <Form>
                <SideFilter />
            </Form>
        </SideBarTw>
    )
}

const SideBarTw = tw.aside`
    hidden
    w-[30%]
    lg:flex
    bg-jacarta-100
    dark:bg-jacarta-700
    h-fit
    rounded-xl
`

export default SideBar
