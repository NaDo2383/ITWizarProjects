/**
 * @createdBy Phill Anderson 2023/07/26
 */
import React, { useRef } from 'react'
import { IMain } from './_interface'
import tw from 'tailwind-styled-components'
import useElementPosition from 'common/window/useElementPosition'
import { useAdminGlobalCtx } from 'common/global/useAdminGlobalCtx'

function AdminMain(props: IMain): JSX.Element {
    const { children } = props
    const ref = useRef(null)
    useElementPosition(ref, { globalName: 'adminMain', isAdminSide: true })
    const { adminGlobalItems } = useAdminGlobalCtx()
    const adminSidebarHeight = adminGlobalItems?.adminHeader?.offsets?.offsetHeight

    const style = {
        height: `calc(100vh - ${(adminSidebarHeight - 1) * 2}px)`,
    }
    return (
        <MainTw ref={ref} className="admin-main" style={style}>
            {children}
        </MainTw>
    )
}

// const MainSc = styled.main`
//   width: 100%;
//   height: calc(100vh - 100px);
//   overflow-y: scroll;
//   padding-inline: 20px;
//   padding-block: 10px;
//   margin:10px;
// `;

const MainTw = tw.main`
  w-full
  overflow-y-scroll
  p-10
`

export default AdminMain
