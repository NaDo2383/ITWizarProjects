import { NextPage } from 'next'
import React from 'react'
import { PopupProvider } from 'common/popup/usePopupCtx'
import Todo from 'features/todo/Todo'

const Todos: NextPage = () => {
    return (
        <PopupProvider>
            <Todo />
        </PopupProvider>
    )
}

export default Todos
